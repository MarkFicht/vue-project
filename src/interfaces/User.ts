export default interface User {
    id?: number;
    token?: string;
    username: string;
    password: string;
    email: string;
    keepLogIn?: boolean;
}
