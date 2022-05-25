import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import { authApi } from './api/authApi';
import { passwordResetApi } from './api/passwordResetApi';
import { vacanciesApi } from './api/vacanciesApi';
import { profileApi } from './api/profileApi';
import { contactsApi } from './api/contactsApi';

const persistConfig = {
    key: 'store',
    whitelist: ['auth'],
    storage,
};

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [passwordResetApi.reducerPath]: passwordResetApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: authReducer,
    profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        })
            .concat(authApi.middleware)
            .concat(passwordResetApi.middleware)
            .concat(profileApi.middleware)
            .concat(vacanciesApi.middleware)
            .concat(contactsApi.middleware),

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
