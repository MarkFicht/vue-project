import type IGame from './Game';
// import {} from 'firebase/auth';

export default interface IUser {
    password?: string;
    keepLogIn?: boolean;
    auth?: any;
    accessToken?: string;
    uid?: string;
    refreshToken?: string;
    displayName: string;
    email: string;
    timestamp?: any;
    readyToGame?: boolean;
    game?: IGame['id'];
    online?: string;
}
