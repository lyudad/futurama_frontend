export interface loginState {
    user: object | null;
    token: string | null;
}

export interface loginForm {
    email: string;
    password: string;
}
