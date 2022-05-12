export interface loginState {
    user: object | null;
    token: string;
}

export interface loginForm {
    email: string;
    password: string;
}

export interface signupForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}
