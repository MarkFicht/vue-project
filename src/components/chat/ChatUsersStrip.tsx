import type { ChatUser, PresenceFilterState } from '@/types/chat';
import { withUnreadSuffix } from '@/types/chat';
import { UserFlag } from '@/components/UserFlag';

export function ChatUsersStrip({
    activeUsers,
    activeUserId,
    presenceMap,
    unreadByUserId,
    onSelectUser
}: {
    activeUsers: ChatUser[];
    activeUserId: string;
    presenceMap: Record<string, PresenceFilterState | undefined>;
    unreadByUserId: Map<string, number>;
    onSelectUser: (uid: string) => void;
}) {
    if (!activeUsers.length) {
        return <p className="chatEmptyState">No active players (online/away).</p>;
    }

    return (
        <div className="chatUsersList modalLikeScrollbar">
            {activeUsers.map((entry) => {
                const label = entry.displayName || entry.email || entry.uid;
                const presenceState = presenceMap[entry.uid] ?? 'offline';
                const unreadForUser = unreadByUserId.get(entry.uid) ?? 0;
                return (
                    <button
                        key={entry.uid}
                        type="button"
                        className={`chatUserItem ${activeUserId === entry.uid ? 'chatUserItemActive' : ''}`}
                        onClick={() => onSelectUser(entry.uid)}
                    >
                        <span
                            className={`chatPresenceDot ${
                                presenceState === 'online' ? 'chatPresenceDotOnline' : 'chatPresenceDotAway'
                            }`}
                        />
                        <UserFlag code={entry.countryCode} className="text-sm" />
                        <span className="chatUserName">{withUnreadSuffix(label, unreadForUser)}</span>
                    </button>
                );
            })}
        </div>
    );
}
