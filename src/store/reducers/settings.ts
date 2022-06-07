import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IEducation, IWorkExperience, Position, Settings, Skill } from 'types/profile';

const initialState: Settings = {
    skills: null,
    positions: null,
    experiences: [],
    educations: []
}

export const settings = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSkills: (state, action: PayloadAction<Array<Skill>>) => {
            state.skills = action.payload;
        },
        setPositions: (state, action: PayloadAction<Array<Position>>) => {
            state.positions = action.payload;
        },
        setEducation: (state, action: PayloadAction<Array<IEducation>>) => {
            state.educations = action.payload;
        },
        setExperience: (state, action: PayloadAction<Array<IWorkExperience>>) => {
            state.experiences = action.payload;
        },
        addEducation: (state, action: PayloadAction<IEducation>) => {
            state.educations = [...state.educations, action.payload];
        },
        addExperience: (state, action: PayloadAction<IWorkExperience>) => {
            state.experiences = [...state.experiences, action.payload];
        },
        changeExperience: (state, action: PayloadAction<{data: IWorkExperience, id: number}>) => {
            state.experiences?.splice(action.payload.id, 1, action.payload.data);
        },
        changeEducation: (state, action: PayloadAction<{data: IEducation, id: number}>) => {
            state.educations?.splice(action.payload.id, 1, action.payload.data);
        },
        deleteExperience: (state, action: PayloadAction<number>) => {
            state.experiences?.splice(action.payload, 1);
        },
        deleteEducation: (state, action: PayloadAction<number>) => {
            state.educations?.splice(action.payload, 1);
        },
    },
});

export const { 
    setSkills, 
    setPositions, 
    setEducation, 
    setExperience, 
    addEducation, 
    addExperience, 
    changeEducation, 
    changeExperience,
    deleteEducation,
    deleteExperience
} = settings.actions;

export default settings.reducer;
