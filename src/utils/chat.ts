export function buildPrivateChatId(uidA: string, uidB: string) {
    return [uidA, uidB].sort().join('_');
}
