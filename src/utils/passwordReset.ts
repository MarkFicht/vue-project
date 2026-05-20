import { sendPasswordResetEmail } from 'firebase/auth';
import { MAX_EMAIL_LENGTH, normalizeAuthEmail } from '@/constants/auth';
import { auth } from '@/firebaseConfig';

export const PASSWORD_RESET_SENT_MESSAGE =
    'If an account exists for this email, you will receive a password reset link shortly.';

export async function sendAccountPasswordResetEmail(email: string) {
    const normalizedEmail = normalizeAuthEmail(email);
    if (!normalizedEmail) {
        throw new Error('Email is required.');
    }
    if (normalizedEmail.length > MAX_EMAIL_LENGTH) {
        throw new Error(`Email is too long (max ${MAX_EMAIL_LENGTH} characters).`);
    }
    await sendPasswordResetEmail(auth, normalizedEmail);
}
