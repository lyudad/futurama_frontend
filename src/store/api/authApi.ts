import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL, prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*')
            return headers
        },
    }),

    endpoints: (builder) => ({
        signinUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: constants.USER_LOGIN,
                    method: 'post',
                    body,
                };
            },
        }),
        signupUser: builder.mutation({
            query: (body: { firstName: string, lastName: string, email: string; password: string, role: string, }) => {
                return {
                    url: constants.USER_SIGNUP,
                    method: 'post',
                    body,
                };
            },
        }),
    }),
});

export const { useSigninUserMutation, useSignupUserMutation } = authApi;
