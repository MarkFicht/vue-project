import type IGame from './Game';
// import {} from 'firebase/auth';

export default interface IUser {
    password?: string;
    keepLogIn?: boolean;
    auth?: any;
    accessToken?: string;
    refreshToken?: string;
    uid: string;
    displayName: string;
    email: string;
    game?: IGame['id'];
    readyToGame?: boolean;
    status?: 'online' | 'away' | 'offline';
    timestamp?: any;
    online?: string;
    createdAt?: any;
    updatedAt?: any;
    lastSeenAt?: any;
    schemaVersion?: number;
    soundMuted?: boolean;
}
