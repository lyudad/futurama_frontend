import { createSlice } from '@reduxjs/toolkit';
import { userState } from 'types/user.interface';

const initialState: userState = {
    email: '',
    firstname: '',
    lastname: '',
    role: '',
};

export const userRegister = createSlice({
    name: 'userRegister',
    initialState,
    reducers: {
        getUserRegisterData(state, action) {
            state.email = action.payload.email;
            state.firstname = action.payload.firstName;
            state.lastname = action.payload.lastName;
            state.role = action.payload.role;
        },
    },
});

export const { getUserRegisterData } = userRegister.actions;

export default userRegister.reducer;
