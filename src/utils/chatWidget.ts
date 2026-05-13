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
export const CHAT_READ_PREFIX = 'chat-read-v1:';
export const CHAT_NOTIFY_MUTE_PREFIX = 'chat-notify-muted-v1:';
export const READ_BOTTOM_THRESHOLD_PX = 56;

export function formatChatTime(value?: Timestamp, createdAtMs?: number) {
    const date = value?.toDate() ?? (createdAtMs ? new Date(createdAtMs) : null);
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function loadReadMap(uid: string): Record<string, number> {
    try {
        const raw = localStorage.getItem(`${CHAT_READ_PREFIX}${uid}`);
        if (!raw) return {};
        return JSON.parse(raw) as Record<string, number>;
    } catch {
        return {};
    }
}

export function saveReadMap(uid: string, map: Record<string, number>) {
    try {
        localStorage.setItem(`${CHAT_READ_PREFIX}${uid}`, JSON.stringify(map));
    } catch {
        // Ignore storage quota errors.
    }
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
        localStorage.setItem(`${CHAT_CACHE_PREFIX}${uid}:${chatId}`, JSON.stringify(payload));
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
        if (!timestampMs) return formatChatTime(createdAt, timestampMs);
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
