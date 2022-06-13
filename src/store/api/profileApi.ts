import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';
import { RootState } from 'store';
import { UserProfile } from 'types/profile';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Access-Control-Allow-Origin', '*');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.mutation({
            query: (headers: { token: string; }) => {
                return {
                    url: constants.GET_PROFILE,
                    method: 'get',
                    headers,
                };
            },
        }),
        getAllProfiles: builder.query<UserProfile[], void>({
            query: () => {
                return {
                    url: constants.GET_ALL_PROFILES,
                    method: "get"
                };
            },
        }),
        getProfileById: builder.query<UserProfile, number>({
            query: (id) => {
                return {
                    url: constants.GET_PROFILE + id,
                    method: "get"
                };
            },
        }),
    }),
});

export const { useGetProfileMutation, useGetAllProfilesQuery, useGetProfileByIdQuery } = profileApi;
