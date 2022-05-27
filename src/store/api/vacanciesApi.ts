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
        getVacancies: builder.query({
            query: (body?: { title?: string }) => ({
                url: constants.GET_VACANCIES,
                method: 'POST',
                body
            }),
        }),
        getVacancyById: builder.query({
            query: (vacancyId: number) => constants.GET_VACANCIES + vacancyId
        }),
    }),
});

export const { useGetVacanciesQuery, useGetVacancyByIdQuery } =
    vacanciesApi;
