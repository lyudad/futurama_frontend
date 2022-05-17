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
    },
});

export const { setProfile } = profile.actions;

export default profile.reducer;
