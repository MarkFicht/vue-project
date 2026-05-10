/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const admin = require('firebase-admin');

function sanitizeDisplayName(value) {
    return String(value || '')
        .trim()
        .replace(/\s+/g, ' ');
}

function normalizeDisplayName(value) {
    const normalizedSpaces = sanitizeDisplayName(value);
    const withoutDiacritics = normalizedSpaces.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    return withoutDiacritics.toLowerCase().replaceAll('/', '_');
}

function getArgValue(flagName) {
    const index = process.argv.findIndex((value) => value === flagName);
    if (index === -1) return '';
    return process.argv[index + 1] || '';
}

function initAdmin() {
    const serviceAccountArg = getArgValue('--service-account');
    const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
    const serviceAccountPath = serviceAccountArg || serviceAccountEnv;

    if (serviceAccountPath) {
        const absolutePath = path.resolve(serviceAccountPath);
        const json = fs.readFileSync(absolutePath, 'utf8');
        const serviceAccount = JSON.parse(json);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        return;
    }

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        return;
    }

    throw new Error(
        [
            'Missing credentials.',
            'Use one of:',
            '1) node scripts/migrate-display-names.cjs --service-account ./serviceAccount.json',
            '2) set FIREBASE_SERVICE_ACCOUNT=./serviceAccount.json',
            '3) set GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json'
        ].join('\n')
    );
}

async function run() {
    initAdmin();
    const db = admin.firestore();

    const [usersSnap, displayNamesSnap] = await Promise.all([
        db.collection('users').get(),
        db.collection('displayNames').get()
    ]);

    const takenKeys = new Map();
    displayNamesSnap.forEach((docSnap) => {
        const data = docSnap.data() || {};
        const key = docSnap.id;
        const ownerUid = String(data.uid || '');
        if (ownerUid) {
            takenKeys.set(key, ownerUid);
        }
    });

    let batch = db.batch();
    let writesInBatch = 0;
    let createdOrUpdated = 0;
    const conflicts = [];
    const skippedNoName = [];

    const flushBatch = async () => {
        if (!writesInBatch) return;
        await batch.commit();
        batch = db.batch();
        writesInBatch = 0;
    };

    for (const userDoc of usersSnap.docs) {
        const data = userDoc.data() || {};
        const uid = String(data.uid || userDoc.id);
        const displayName = sanitizeDisplayName(data.displayName);
        if (!displayName) {
            skippedNoName.push(uid);
            continue;
        }

        const displayNameKey = normalizeDisplayName(displayName);
        if (!displayNameKey) {
            skippedNoName.push(uid);
            continue;
        }

        const currentOwnerUid = takenKeys.get(displayNameKey);
        if (currentOwnerUid && currentOwnerUid !== uid) {
            conflicts.push({
                uid,
                displayName,
                displayNameKey,
                ownerUid: currentOwnerUid
            });
            continue;
        }

        const userRef = db.collection('users').doc(uid);
        const displayNameRef = db.collection('displayNames').doc(displayNameKey);

        batch.set(
            displayNameRef,
            {
                uid,
                displayName,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                createdAt: data.createdAt || admin.firestore.FieldValue.serverTimestamp()
            },
            { merge: true }
        );
        writesInBatch += 1;

        batch.set(
            userRef,
            {
                displayName,
                displayNameKey,
                updatedAt: admin.firestore.FieldValue.serverTimestamp()
            },
            { merge: true }
        );
        writesInBatch += 1;

        createdOrUpdated += 1;
        takenKeys.set(displayNameKey, uid);

        if (writesInBatch >= 400) {
            await flushBatch();
        }
    }

    await flushBatch();

    console.log('Display-name migration done.');
    console.log(`Users total: ${usersSnap.size}`);
    console.log(`Users migrated: ${createdOrUpdated}`);
    console.log(`Users skipped (missing displayName): ${skippedNoName.length}`);
    console.log(`Conflicts detected: ${conflicts.length}`);

    if (skippedNoName.length) {
        console.log('\nSkipped users (missing displayName):');
        skippedNoName.forEach((uid) => console.log(`- ${uid}`));
    }

    if (conflicts.length) {
        console.log('\nConflicts to fix manually (duplicate displayNameKey):');
        conflicts.forEach((item) => {
            console.log(
                `- uid=${item.uid}, name="${item.displayName}", key="${item.displayNameKey}", takenBy=${item.ownerUid}`
            );
        });
        process.exitCode = 2;
    }
}

run().catch((error) => {
    console.error('Migration failed.');
    console.error(error);
    process.exit(1);
});
