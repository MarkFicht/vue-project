# Firebase Security Hardening

This project now uses a strict, least-privilege baseline for Firestore, Realtime Database, and Cloud Storage.

## What Is Protected

- Firestore `users/{uid}`: only owner can create/update/delete own profile.
- Firestore `gameStatus/*`: only authenticated participants can change lobby state.
- Firestore `gameDuel/table1`: only duel participants can write the live game table.
- Firestore chat docs: tighter shape validation and participant checks.
- RTDB `status/{uid}`: only owner can write, with strict schema validation.
- Storage: default deny-all (`read`/`write` blocked for all paths).

## Deploy Rules Immediately

Run from project root:

```bash
firebase deploy --only firestore:rules,database,storage
```

## Production Checklist (Senior-Level Baseline)

1. Enforce App Check in Firebase Console for:
   - Firestore
   - Realtime Database
   - Storage
   - Cloud Messaging (if used)
2. Enable Billing Budget Alerts in Google Cloud (multiple thresholds, e.g. 25/50/75/100%).
3. Add quota caps where possible (especially Cloud Functions/Storage egress if used).
4. Remove unused Auth providers; keep only required ones.
5. Restrict Authentication authorized domains to production + required localhost entries.
6. Enable Firebase Audit Logs in Google Cloud and review them regularly.
7. Rotate any server-side secrets and move them to Secret Manager (if backend exists).

## Important Note

Client-only game logic can still be manipulated by a malicious participant in their own session.  
For anti-cheat and stronger integrity, move critical game state transitions to trusted backend code (Cloud Functions / server API) and keep clients as requesters only.
