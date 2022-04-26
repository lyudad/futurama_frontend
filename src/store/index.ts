import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import userRegister from './reducers/user.register';

export const store = configureStore({
    reducer: {
        user_register: userRegister,
    },
    middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
