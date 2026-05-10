export function normalizeDisplayName(value: string) {
    const normalizedSpaces = value.trim().replace(/\s+/g, ' ');
    const withoutDiacritics = normalizedSpaces.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    return withoutDiacritics.toLowerCase().replaceAll('/', '_');
}

export function sanitizeDisplayName(value: string) {
    return value.trim().replace(/\s+/g, ' ');
}
