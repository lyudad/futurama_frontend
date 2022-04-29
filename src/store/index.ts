import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import emailReducer from './reducers/email';
import loginReducer from './reducers/login';
import userRegister from './reducers/user.register';
import { authApi } from './api/authApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        email: emailReducer,
        login: loginReducer,
        user_register: userRegister,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
