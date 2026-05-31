import type { Timestamp } from 'firebase/firestore';

export type ChatMessageLite = {
    id: string;
    senderUid: string;
    text: string;
    createdAtMs: number;
    createdAt?: Timestamp;
};

export type ChatRenderRow =
    | { kind: 'date'; key: string; label: string }
    | {
          kind: 'message';
          key: string;
          message: ChatMessageLite;
          isMine: boolean;
          groupTop: boolean;
          groupBottom: boolean;
          timeLabel: string;
          isFresh: boolean;
      };

export const CHAT_PAGE_SIZE = 12;
export const CACHE_MSG_LIMIT = 12;
export const CHAT_CACHE_PREFIX = 'chat-cache-v1:';
export const CHAT_NOTIFY_MUTE_PREFIX = 'chat-notify-muted-v1:';
export const CHAT_RECENT_HIDDEN_PREFIX = 'chat-recent-hidden-v1:';
export const READ_BOTTOM_THRESHOLD_PX = 56;

export function resolveSnapshotTimeMs(
    value: Timestamp | undefined,
    hasPendingWrites: boolean,
    fallbackMs = 0
) {
    const resolvedMs = value?.toMillis?.() ?? 0;
    if (resolvedMs > 0) return resolvedMs;
    if (hasPendingWrites) return Date.now();
    return fallbackMs;
}

export function formatChatTime(value?: Timestamp, createdAtMs?: number) {
    const date = value?.toDate?.() ?? (createdAtMs && createdAtMs > 0 ? new Date(createdAtMs) : null);
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function timestampToMs(value: unknown): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'object' && value !== null) {
        if ('toMillis' in value && typeof (value as { toMillis?: () => number }).toMillis === 'function') {
            return (value as { toMillis: () => number }).toMillis();
        }
        if ('seconds' in value && typeof (value as { seconds?: unknown }).seconds === 'number') {
            const seconds = (value as { seconds: number }).seconds;
            const nanos =
                'nanoseconds' in value && typeof (value as { nanoseconds?: unknown }).nanoseconds === 'number'
                    ? (value as { nanoseconds: number }).nanoseconds
                    : 0;
            return seconds * 1000 + Math.floor(nanos / 1_000_000);
        }
    }
    return 0;
}

export function getEffectiveReadAtMs(
    summary: { readBy?: Record<string, unknown> },
    uid: string,
    optimisticReadAtMs = 0
) {
    return Math.max(timestampToMs(summary.readBy?.[uid]), optimisticReadAtMs);
}

export function isChatUnreadForUser(
    summary: {
        lastMessageSenderUid: string;
        updatedAtMs: number;
        readBy?: Record<string, unknown>;
    },
    uid: string,
    optimisticReadAtMs = 0
) {
    if (!summary.lastMessageSenderUid || summary.lastMessageSenderUid === uid) return false;
    return summary.updatedAtMs > getEffectiveReadAtMs(summary, uid, optimisticReadAtMs);
}

export function loadChatNotifyMuted(uid: string) {
    try {
        return localStorage.getItem(`${CHAT_NOTIFY_MUTE_PREFIX}${uid}`) === '1';
    } catch {
        return false;
    }
}

export function saveChatNotifyMuted(uid: string, value: boolean) {
    try {
        localStorage.setItem(`${CHAT_NOTIFY_MUTE_PREFIX}${uid}`, value ? '1' : '0');
    } catch {
        // Ignore storage quota errors.
    }
}

export function loadHiddenRecentChatIds(uid: string): string[] {
    try {
        const raw = localStorage.getItem(`${CHAT_RECENT_HIDDEN_PREFIX}${uid}`);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
    } catch {
        return [];
    }
}

export function saveHiddenRecentChatIds(uid: string, chatIds: string[]) {
    try {
        localStorage.setItem(`${CHAT_RECENT_HIDDEN_PREFIX}${uid}`, JSON.stringify(chatIds));
    } catch {
        // Ignore storage quota errors.
    }
}

export function hydrateCachedMessages(uid: string, chatId: string): ChatMessageLite[] {
    try {
        const raw = localStorage.getItem(`${CHAT_CACHE_PREFIX}${uid}:${chatId}`);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as Array<{
            id: string;
            senderUid: string;
            text: string;
            createdAtMs?: number;
        }>;
        return parsed
            .filter((entry) => entry.id && entry.senderUid && entry.text)
            .map((entry) => ({
                id: entry.id,
                senderUid: entry.senderUid,
                text: entry.text,
                createdAtMs: entry.createdAtMs ?? 0
            }))
            .slice(-CHAT_PAGE_SIZE);
    } catch {
        return [];
    }
}

export function persistCachedMessages(uid: string, chatId: string, messages: ChatMessageLite[]) {
    try {
        const payload = messages.slice(-CACHE_MSG_LIMIT).map((entry) => ({
            id: entry.id,
            senderUid: entry.senderUid,
            text: entry.text,
            createdAtMs: entry.createdAtMs
        }));
        if (!payload.length) {
            localStorage.removeItem(`${CHAT_CACHE_PREFIX}${uid}:${chatId}`);
            return;
        }
        localStorage.setItem(`${CHAT_CACHE_PREFIX}${uid}:${chatId}`, JSON.stringify(payload));
    } catch {
        // Ignore storage quota errors.
    }
}

export function clearCachedMessages(uid: string, chatId: string) {
    try {
        localStorage.removeItem(`${CHAT_CACHE_PREFIX}${uid}:${chatId}`);
    } catch {
        // Ignore storage quota errors.
    }
}

export function pruneCachedMessages(uid: string, validChatIds: Set<string>) {
    try {
        const keyPrefix = `${CHAT_CACHE_PREFIX}${uid}:`;
        for (let index = localStorage.length - 1; index >= 0; index -= 1) {
            const key = localStorage.key(index);
            if (!key || !key.startsWith(keyPrefix)) continue;
            const chatId = key.slice(keyPrefix.length);
            if (!validChatIds.has(chatId)) {
                localStorage.removeItem(key);
            }
        }
    } catch {
        // Ignore storage quota errors.
    }
}

export function mergeMessages(messages: ChatMessageLite[]) {
    const byId = new Map<string, ChatMessageLite>();
    messages.forEach((entry) => {
        byId.set(entry.id, entry);
    });
    return Array.from(byId.values()).sort((a, b) => {
        const aSortMs = a.createdAtMs > 0 ? a.createdAtMs : Number.MAX_SAFE_INTEGER;
        const bSortMs = b.createdAtMs > 0 ? b.createdAtMs : Number.MAX_SAFE_INTEGER;
        if (aSortMs !== bSortMs) return aSortMs - bSortMs;
        return a.id.localeCompare(b.id);
    });
}

export function isNearBottom(element: HTMLElement | null) {
    if (!element) return false;
    const distance = element.scrollHeight - element.scrollTop - element.clientHeight;
    return distance <= READ_BOTTOM_THRESHOLD_PX;
}

export function buildChatRenderRows(
    messages: ChatMessageLite[],
    freshMessageIds: Record<string, true>,
    nowMs: number,
    uid: string,
    groupWindowMs: number
): ChatRenderRow[] {
    const rows: ChatRenderRow[] = [];

    const getDateLabel = (timestampMs: number) => {
        const date = new Date(timestampMs);
        const today = new Date(nowMs);
        if (date.toDateString() === today.toDateString()) return 'Today';
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        return date.toLocaleDateString();
    };

    const getTimeLabel = (timestampMs: number, createdAt?: Timestamp) => {
        if (!timestampMs) {
            return formatChatTime(createdAt, timestampMs) || 'now';
        }
        const deltaMinutes = Math.floor((nowMs - timestampMs) / 60000);
        if (deltaMinutes <= 0) return 'now';
        if (deltaMinutes < 60) return `${deltaMinutes} min ago`;
        return formatChatTime(createdAt, timestampMs);
    };

    for (let index = 0; index < messages.length; index += 1) {
        const message = messages[index];
        const prev = index > 0 ? messages[index - 1] : null;
        const next = index < messages.length - 1 ? messages[index + 1] : null;
        const dateKey = new Date(message.createdAtMs || 0).toDateString();
        const prevDateKey = prev ? new Date(prev.createdAtMs || 0).toDateString() : '';
        if (!prev || dateKey !== prevDateKey) {
            rows.push({
                kind: 'date',
                key: `date-${dateKey}-${index}`,
                label: getDateLabel(message.createdAtMs || nowMs)
            });
        }

        const closeToPrev =
            !!prev &&
            prev.senderUid === message.senderUid &&
            Math.abs((message.createdAtMs || 0) - (prev.createdAtMs || 0)) <= groupWindowMs;
        const closeToNext =
            !!next &&
            next.senderUid === message.senderUid &&
            Math.abs((next.createdAtMs || 0) - (message.createdAtMs || 0)) <= groupWindowMs;

        rows.push({
            kind: 'message',
            key: message.id,
            message,
            isMine: message.senderUid === uid,
            groupTop: !closeToPrev,
            groupBottom: !closeToNext,
            timeLabel: getTimeLabel(message.createdAtMs, message.createdAt),
            isFresh: !!freshMessageIds[message.id]
        });
    }

    return rows;
}
