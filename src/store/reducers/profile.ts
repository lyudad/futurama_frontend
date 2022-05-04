import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserProfile } from 'types/profile';

const initialState: UserProfile = {
    firstName: '',
    lastName: '',
    profilePhoto: '',
    englishLevel: '',
    skills: [],
    email: '',
    phoneNumber: '',
    position: '',
    description: '',
    desirebleSalaryLevel: 0,
    availableAmountOfHours: '',
    otherExperience: '',
    education: {
        establishment: '',
        level: '',
        start: new Date(),
        end: new Date(),
    },
    workExperience: {
        company: '',
        position: '',
        start: new Date(),
        end: new Date(),
        description: '',
    },
};

export const profile = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<{ user: UserProfile }>) => {
            state = action.payload.user;
        },
        defaultState: (state) => {
            state = initialState;
        },
    },
});

export const { setProfile, defaultState } = profile.actions;

export default profile.reducer;
