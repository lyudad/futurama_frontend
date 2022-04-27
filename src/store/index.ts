import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counter';
import emailReducer from './reducers/email';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        email: emailReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
