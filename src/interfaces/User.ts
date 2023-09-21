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
}
