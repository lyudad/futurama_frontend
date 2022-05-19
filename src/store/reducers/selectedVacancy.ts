import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVacancy } from 'types/vacancy';

const initialState = {
    data: {}
};

export const selectedVacancy = createSlice({
    name: 'selectedVacancy',
    initialState,
    reducers: {
        setSelectedVacancy: (state, action: PayloadAction<IVacancy>) => {
            state.data = action.payload;
        },
    },
});

export const { setSelectedVacancy } = selectedVacancy.actions;

export default selectedVacancy.reducer;
