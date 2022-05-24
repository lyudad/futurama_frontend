import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { constants } from 'constants/urls';

export const passwordResetApi = createApi({
    reducerPath: 'passwordReset',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_RESET_PASSWORD_BC_URL,
    }),
    endpoints: (builder) => ({
        passwordReset: builder.mutation({
            query: (body: { password: string; email: string | null }) => ({
                url: `${constants.PASSWORD_RESET}?email=${body.email}`,
                method: 'PATCH',
                body,
            }),
        }),
        sendEmail: builder.mutation({
            query: (body: object) => ({
                url: constants.SEND_EMAIL,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { usePasswordResetMutation, useSendEmailMutation } =
    passwordResetApi;
