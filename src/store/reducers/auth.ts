import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginState } from 'types/auth';

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
        }
    },
});

export const { setUser } = auth.actions;

export default auth.reducer;
