import type { Timestamp } from 'firebase/firestore';

export type ChatUser = {
    uid: string;
    displayName: string;
    email: string;
    countryCode?: string;
};

export type ChatSummary = {
    chatId: string;
    participants: string[];
    lastMessage: string;
    lastMessageSenderUid: string;
    updatedAt?: Timestamp;
    updatedAtMs: number;
    readBy?: Record<string, unknown>;
};

export type RecentConversation = ChatSummary & {
    otherUid: string;
    userInfo?: ChatUser;
};

export type PresenceFilterState = 'online' | 'away' | 'offline';

export const CHAT_SPAM_WINDOW_MS = 10000;
export const CHAT_SPAM_MAX_MESSAGES_PER_WINDOW = 6;
export const CHAT_SPAM_MIN_INTERVAL_MS = 700;
export const CHAT_SPAM_DUPLICATE_COOLDOWN_MS = 8000;
export const CHAT_GROUP_WINDOW_MS = 120000;
export const CHAT_EMOJI_QUICK_PICK = ['😀', '😂', '🔥', '👍', '❤️', '😎', '🤝', '🎉'];

export function buildPrivateChatId(uidA: string, uidB: string) {
    return [uidA, uidB].sort().join('_');
}

export function getPeerUid(participants: string[], uid: string) {
    return participants.find((id) => id !== uid) || '';
}

export function withUnreadSuffix(label: string, unread: number) {
    return unread > 0 ? `${label} (${unread})` : label;
}
