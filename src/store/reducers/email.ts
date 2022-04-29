import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EmailState {
    value: string;
}

const initialState: EmailState = {
    value: '',
};

export const email = createSlice({
    name: 'email',
    initialState,
    reducers: {
        addEmail: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { addEmail } = email.actions;

export default email.reducer;
