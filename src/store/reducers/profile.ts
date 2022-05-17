import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProfileState, UserProfile } from 'types/profile';

const initialState: ProfileState = {
    profile: null,
};

export const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<UserProfile>) => {            
            state.profile = action.payload;
        },
    },
});

export const { setProfile } = profile.actions;

export default profile.reducer;
