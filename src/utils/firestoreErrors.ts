export const isFirestoreCode = (error: unknown, code: string) => (error as { code?: string })?.code === code;

export const isAnyFirestoreCode = (error: unknown, codes: string[]) => codes.some((code) => isFirestoreCode(error, code));
