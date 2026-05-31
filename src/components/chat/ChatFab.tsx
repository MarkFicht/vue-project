import { MessageCircle } from 'lucide-react';

export function ChatFab({ unreadCount, onOpen }: { unreadCount: number; onOpen: () => void }) {
    return (
        <button type="button" className="chatFab" onClick={onOpen} aria-label="Open chat" title="Open chat">
            <MessageCircle className="h-5 w-5" />
            {unreadCount > 0 && <span className="chatUnreadBadge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
        </button>
    );
}
