import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authApi } from './api/authApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
=======
import counterReducer from './reducers/counter';
import emailReducer from './reducers/email';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        email: emailReducer
>>>>>>> develop
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
