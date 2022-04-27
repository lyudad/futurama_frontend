import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
    endpoints: (builder) => ({
        signinUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: '/user/signin',
                    method: 'post',
                    body,
                };
            },
        }),
    }),
});

export const { useSigninUserMutation } = authApi;
