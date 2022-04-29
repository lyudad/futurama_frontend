import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
    endpoints: (builder) => ({
        signinGoogle: builder.mutation({
            query: () => {
                return {
                    url: '/user/auth/google/callback',
                    method: 'get',
                };
            },
        }),
        signinUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: '/user/login',
                    method: 'post',
                    body,
                };
            },
        }),
    }),
});

export const { useSigninUserMutation, useSigninGoogleMutation } = authApi;
