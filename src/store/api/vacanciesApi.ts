import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { constants } from 'constants/urls';

export const vacanciesApi = createApi({
    reducerPath: 'vacancies',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL, prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getAllVacancies: builder.mutation({
            query: () => ({
                url: constants.GET_ALL_VACANCIES,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllVacanciesMutation } =
    vacanciesApi;
