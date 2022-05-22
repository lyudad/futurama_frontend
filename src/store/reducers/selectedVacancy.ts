import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVacancy } from 'types/vacancy';

type State = {
    data: IVacancy
}

const initialState: State = {
    data: {        
        ownerId: 0,
        title: '',
        company: '',
        location: '',
        description: '',
        englishLevel: '',
        price: 0,
        timePerWeek: 0,
        createdAt: '',
        updatedAt: '',
        category: [],
        skills: []
    }
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
