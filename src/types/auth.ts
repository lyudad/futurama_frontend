export interface authState {
    user: userState | null;
    token: string;
}

export interface userState {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    phone?: NullableString;
    photo?: NullableString;
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

type NullableString = string | null;
