import { useEffect, useMemo, useState } from 'react';
import type { ChatSummary, ChatUser } from '@/types/chat';
import { buildPrivateChatId } from '@/types/chat';

export function useChatSelection({
    uid,
    sortedUsers,
    activeUsers,
    usersById,
    chatSummaryById
}: {
    uid: string;
    sortedUsers: ChatUser[];
    activeUsers: ChatUser[];
    usersById: Map<string, ChatUser>;
    chatSummaryById: Map<string, ChatSummary>;
}) {
    const [selectedChatId, setSelectedChatId] = useState('');
    const [selectionCleared, setSelectionCleared] = useState(false);
    const [activeUserId, setActiveUserId] = useState('');

    useEffect(() => {
        setSelectedChatId('');
        setSelectionCleared(false);
        setActiveUserId('');
    }, [uid]);

    useEffect(() => {
        if (selectedChatId) {
            const selectedExists = chatSummaryById.has(selectedChatId);
            if (!selectedExists) setSelectedChatId('');
            return;
        }
        if (selectionCleared) return;
        if (!sortedUsers.length) {
            setActiveUserId('');
            return;
        }

        const hasCurrent = sortedUsers.some((entry) => entry.uid === activeUserId);
        if (hasCurrent) return;

        if (activeUsers.length) {
            setActiveUserId(activeUsers[0].uid);
            return;
        }
        setActiveUserId(sortedUsers[0].uid);
    }, [activeUserId, activeUsers, chatSummaryById, selectedChatId, selectionCleared, sortedUsers]);

    const activeUser = useMemo(
        () => sortedUsers.find((entry) => entry.uid === activeUserId) ?? null,
        [activeUserId, sortedUsers]
    );

    const selectedSummary = useMemo(() => {
        if (!selectedChatId) return null;
        return chatSummaryById.get(selectedChatId) ?? null;
    }, [chatSummaryById, selectedChatId]);

    const activePeerUid = useMemo(() => {
        if (selectedSummary) {
            return selectedSummary.participants.find((id) => id !== uid) || '';
        }
        return activeUser?.uid || '';
    }, [selectedSummary, activeUser?.uid, uid]);

    const activePeerLabel = useMemo(() => {
        if (activeUser) return activeUser.displayName || activeUser.email || activeUser.uid;
        if (selectedSummary) {
            const peerUid = selectedSummary.participants.find((id) => id !== uid) || '';
            const fromMap = usersById.get(peerUid);
            if (fromMap) return fromMap.displayName || fromMap.email || fromMap.uid;
            return peerUid || 'Player';
        }
        return '';
    }, [activeUser, selectedSummary, uid, usersById]);

    const activeChatId = useMemo(() => {
        if (selectedSummary) return selectedSummary.chatId;
        if (!activePeerUid) return '';
        return buildPrivateChatId(uid, activePeerUid);
    }, [selectedSummary, activePeerUid, uid]);

    const clearActiveConversation = () => {
        setSelectedChatId('');
        setActiveUserId('');
        setSelectionCleared(true);
    };

    const openConversation = (peerUid: string, explicitChatId?: string) => {
        setSelectionCleared(false);
        setSelectedChatId(explicitChatId || '');
        setActiveUserId(peerUid);
    };

    const openFromNotification = (chatId: string, senderUid: string) => {
        setSelectionCleared(false);
        if (chatId) setSelectedChatId(chatId);
        if (senderUid) setActiveUserId(senderUid);
    };

    return {
        selectedChatId,
        selectionCleared,
        activeUserId,
        activeUser,
        activePeerUid,
        activePeerLabel,
        activeChatId,
        setSelectionCleared,
        clearActiveConversation,
        openConversation,
        openFromNotification
    };
}
