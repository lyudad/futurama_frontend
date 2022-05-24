import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL, prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.mutation({
            query: (headers: { token: string }) => {
                return {
                    url: constants.GET_PROFILE,
                    method: 'get',
                    headers,
                };
            },
        }),
    }),
});

export const { useGetProfileMutation } = profileApi;
