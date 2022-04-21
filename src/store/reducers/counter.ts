import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

export const counter = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = counter.actions;

export default counter.reducer;
