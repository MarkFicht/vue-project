import type User from './User';
// import {} from 'firebase/auth';

export default interface Game {
    id: string;
    status: 'Free' | 'Lobby' | 'Busy';
    isStarted: boolean;
    playerLostConnection: boolean;
    players: User[];
}
