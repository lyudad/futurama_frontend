import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileState } from 'types/profile';

const initialState: ProfileState = {
    profile: null,
};

export const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{ user: ProfileState }>) => {
            state = action.payload.user;
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

export const { setProfile, defaultState } = profile.actions;

export default profile.reducer;
