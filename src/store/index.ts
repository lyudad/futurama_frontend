import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import settingsReducer from './reducers/settings';
import { authApi } from './api/authApi';
import { passwordResetApi } from './api/passwordResetApi';
import { vacanciesApi } from './api/vacanciesApi';
import { profileApi } from './api/profileApi';
import { contactsApi } from './api/contactsApi';
import { proposalsApi } from './api/proposalsApi';
import { settingsApi } from './api/settingsApi';
import { contractsApi } from './api/contractsApi';


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
    [proposalsApi.reducerPath]: proposalsApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [contractsApi.reducerPath]: contractsApi.reducer,
    auth: authReducer,
    profile: profileReducer,
    settings: settingsReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(authApi.middleware)
            .concat(settingsApi.middleware)
            .concat(passwordResetApi.middleware)
            .concat(profileApi.middleware)
            .concat(vacanciesApi.middleware)
            .concat(contactsApi.middleware)
            .concat(proposalsApi.middleware)
            .concat(contractsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
