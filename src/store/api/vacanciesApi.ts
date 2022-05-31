import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { constants } from 'constants/urls';

interface Ivacancy {
    title?: string,
    categories?: [],
    englishLevel?: string,
    minPrice?: number,
    maxPrice?: number,
    minTimePerWeek?: number,
    maxTimePerWeek?: number,
    skillsId?: [number]
}

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
            query: (body?: Ivacancy) => ({
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
