import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { constants } from 'constants/urls';

export const passwordResetApi = createApi({
    reducerPath: 'passwordReset',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        passwordReset: builder.mutation({
            query: (body: { password: string; email: string | null }) => ({
                url: `${constants.PASSWORD_RESET}?email=${body.email}`,
                method: 'post',
                body,
            }),
        }),
        sendEmail: builder.mutation({
            query: (body: object) => ({
                url: constants.SEND_EMAIL,
                method: 'post',
                body,
            }),
        }),
    }),
});

export const { usePasswordResetMutation, useSendEmailMutation } =
    passwordResetApi;
