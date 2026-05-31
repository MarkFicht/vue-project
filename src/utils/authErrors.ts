const GENERIC_AUTH_FAILURE = 'Something went wrong. Please try again.';
const GENERIC_SIGN_IN_FAILURE = 'Sign in failed. Please check your email and password.';
const GENERIC_PASSWORD_CHANGE_FAILURE = 'Failed to change password. Please try again.';

function getAuthErrorCode(error: unknown): string {
    return (error as { code?: string }).code ?? '';
}

export function mapLoginAuthError(error: unknown, isRegister: boolean): string {
    const code = getAuthErrorCode(error);

    if (code === 'auth/email-already-in-use') {
        return 'This email is already registered.';
    }
    if (code === 'auth/weak-password') {
        return 'Password is too weak (minimum 6 characters).';
    }
    if (
        code === 'auth/invalid-credential' ||
        code === 'auth/invalid-login-credentials' ||
        code === 'auth/wrong-password'
    ) {
        return isRegister ? GENERIC_AUTH_FAILURE : 'Invalid email or password.';
    }
    if (code === 'auth/invalid-email') {
        return 'Invalid email address.';
    }
    if (code === 'auth/user-disabled') {
        return 'This account has been disabled.';
    }
    if (code === 'auth/too-many-requests') {
        return 'Too many attempts. Please wait and try again.';
    }
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        return 'Sign-in popup was closed.';
    }
    if (code === 'auth/network-request-failed') {
        return 'Network error. Check your connection and try again.';
    }

    return isRegister ? GENERIC_AUTH_FAILURE : GENERIC_SIGN_IN_FAILURE;
}

export function mapPasswordResetError(error: unknown): string {
    const code = getAuthErrorCode(error);

    if (code === 'auth/invalid-email') {
        return 'Invalid email address.';
    }
    if (code === 'auth/missing-email') {
        return 'Email is required.';
    }
    if (code === 'auth/too-many-requests') {
        return 'Too many attempts. Please wait and try again.';
    }

    return GENERIC_AUTH_FAILURE;
}

export function mapPasswordChangeError(error: unknown): string {
    const code = getAuthErrorCode(error);

    if (
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential' ||
        code === 'auth/invalid-login-credentials'
    ) {
        return 'Current password is incorrect.';
    }
    if (code === 'auth/weak-password') {
        return 'New password is too weak (minimum 6 characters).';
    }
    if (code === 'auth/requires-recent-login') {
        return 'Session expired. Sign out, sign in again, then retry.';
    }
    if (code === 'auth/too-many-requests') {
        return 'Too many attempts. Please wait and try again.';
    }

    return GENERIC_PASSWORD_CHANGE_FAILURE;
}
