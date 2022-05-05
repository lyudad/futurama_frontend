import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginState } from 'types/login';

const initialState: loginState = {
    user: null,
    token: '',
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{ user: object; token: string }>
        ) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

export const { setUser, defaultState } = auth.actions;

export default auth.reducer;
