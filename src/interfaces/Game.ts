import type User from './User';
// import {} from 'firebase/auth';

export default interface IGame {
    id: 'Reflex' | 'Duel' | 'Gems' | '';
    status: 'Free' | 'Lobby' | 'Busy';
    players: User[];
}
