import { Bell, BellOff, X } from 'lucide-react';

export function ChatPanelHeader({
    onlineCount,
    awayCount,
    chatNotifyMuted,
    onToggleAlerts,
    onClose
}: {
    onlineCount: number;
    awayCount: number;
    chatNotifyMuted: boolean;
    onToggleAlerts: () => void;
    onClose: () => void;
}) {
    return (
        <header className="chatPanelHeader">
            <div className="chatPanelHeaderRow">
                <div>
                    <p className="chatPanelTitle">Live chat</p>
                    <p className="chatPanelSubtitle">
                        Online: {onlineCount} | Away: {awayCount}
                    </p>
                </div>
                <div className="chatPanelHeaderControls">
                    <span className={`chatNotifyState ${chatNotifyMuted ? 'isMuted' : 'isEnabled'}`}>
                        <span className="chatNotifyStateLabel">Alerts:</span>
                        <span className="chatNotifyStateValue">{chatNotifyMuted ? 'OFF' : 'ON'}</span>
                    </span>
                    <button
                        type="button"
                        className="btn-secondary chatNotifyBtn"
                        onClick={() => void onToggleAlerts()}
                        title={chatNotifyMuted ? 'Chat notifications are disabled' : 'Chat notifications are enabled'}
                        aria-label={chatNotifyMuted ? 'Enable chat notifications' : 'Disable chat notifications'}
                    >
                        {chatNotifyMuted ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                    </button>
                    <button
                        type="button"
                        className="btn-secondary chatCloseBtn"
                        onClick={onClose}
                        title="Close chat"
                        aria-label="Close chat"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
