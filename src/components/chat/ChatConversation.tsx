import { FormEvent, RefObject } from 'react';
import { Send } from 'lucide-react';
import { CHAT_EMOJI_QUICK_PICK } from '@/types/chat';
import type { ChatRenderRow } from '@/utils/chatWidget';

export function ChatConversation({
    activePeerLabel,
    activePeerUid,
    activePeerReadAtMs,
    chatRenderRows,
    hasMoreOlder,
    loadingOlder,
    typingUserLabel,
    draft,
    sending,
    sendError,
    composerInputRef,
    messagesContainerRef,
    messagesEndRef,
    messageRefs,
    onLoadOlder,
    onScroll,
    onDraftChange,
    onSend,
    onInsertEmoji
}: {
    activePeerLabel: string;
    activePeerUid: string;
    activePeerReadAtMs: number;
    chatRenderRows: ChatRenderRow[];
    hasMoreOlder: boolean;
    loadingOlder: boolean;
    typingUserLabel: string;
    draft: string;
    sending: boolean;
    sendError: string;
    composerInputRef: RefObject<HTMLInputElement | null>;
    messagesContainerRef: RefObject<HTMLDivElement | null>;
    messagesEndRef: RefObject<HTMLDivElement | null>;
    messageRefs: RefObject<Record<string, HTMLElement | null>>;
    onLoadOlder: () => void;
    onScroll: () => void;
    onDraftChange: (value: string) => void;
    onSend: (event: FormEvent) => void;
    onInsertEmoji: (emoji: string) => void;
}) {
    return (
        <>
            <div ref={messagesContainerRef} className="chatMessages modalLikeScrollbar" onScroll={onScroll}>
                <div className={`chatLoadOlderSlot ${hasMoreOlder ? 'chatLoadOlderSlotVisible' : ''}`}>
                    {hasMoreOlder && (
                        <button
                            type="button"
                            className="btn-secondary chatLoadOlderBtn"
                            onClick={onLoadOlder}
                            disabled={loadingOlder}
                        >
                            {loadingOlder ? 'Loading...' : 'Load older'}
                        </button>
                    )}
                </div>
                {chatRenderRows.map((row) => {
                    if (row.kind === 'date') {
                        return (
                            <div key={row.key} className="chatDateDivider">
                                <span>{row.label}</span>
                            </div>
                        );
                    }
                    const isRead = row.message.createdAtMs > 0 && activePeerReadAtMs >= row.message.createdAtMs;
                    return (
                        <article key={row.key} className={`chatBubbleWrap ${row.isMine ? 'chatBubbleWrapMine' : ''}`}>
                            <div
                                className={`chatBubble ${row.isMine ? 'chatBubbleMine' : ''} ${
                                    row.groupTop ? 'chatBubbleGroupTop' : 'chatBubbleGroupMid'
                                } ${row.groupBottom ? 'chatBubbleGroupBottom' : 'chatBubbleGroupMid'} ${
                                    row.isFresh ? 'chatBubbleEnter' : ''
                                }`}
                                ref={(node) => {
                                    messageRefs.current[row.message.id] = node;
                                }}
                            >
                                <p>{row.message.text}</p>
                                <div className="chatBubbleMeta">
                                    <time>{row.timeLabel}</time>
                                    {row.isMine && (
                                        <span
                                            className={`chatReadTick ${isRead ? 'isRead' : 'isSent'}`}
                                            aria-label={isRead ? 'Read' : 'Sent'}
                                            title={isRead ? 'Read' : 'Sent'}
                                        >
                                            {isRead ? '✓✓' : '✓'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
                {!chatRenderRows.length && (
                    <p className="chatEmptyState chatEmptyConversation">
                        Start chatting with: {activePeerLabel || activePeerUid}
                    </p>
                )}
                {typingUserLabel && <p className="chatTypingIndicator">{typingUserLabel} is typing...</p>}
                <div ref={messagesEndRef} />
            </div>

            <form className="chatComposer" onSubmit={onSend}>
                <input
                    ref={composerInputRef}
                    className="input"
                    placeholder="Write a message..."
                    value={draft}
                    onChange={(event) => onDraftChange(event.target.value)}
                    maxLength={500}
                />
                <button className="btn-primary chatSendBtn" type="submit" disabled={sending || !draft.trim()}>
                    <Send className="h-4 w-4" />
                </button>
            </form>
            <div className="chatEmojiBar" aria-label="Quick emojis">
                {CHAT_EMOJI_QUICK_PICK.map((emoji) => (
                    <button
                        key={emoji}
                        type="button"
                        className="chatEmojiBtn"
                        onClick={() => onInsertEmoji(emoji)}
                        title={`Insert ${emoji}`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
            {!!sendError && <p className="chatSendError">{sendError}</p>}
        </>
    );
}
