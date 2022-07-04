import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { constants } from 'constants/urls';
import { IvacancyQuery } from 'types/vacancy';

export const vacanciesApi = createApi({
    reducerPath: 'vacancies',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL, prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getVacancies: builder.query({
            query: (body: IvacancyQuery) => ({
                url: `${constants.GET_VACANCIES}?page=${body.pageValue
                    }`,
                method: 'POST',
                body,
            }),
        }),
        createJob: builder.mutation({
            query: (body) => {
                return {
                    url: constants.SEND_JOB,
                    method: "post",
                    body
                };
            },
        }),
        getVacancyById: builder.query({
            query: (vacancyId: number) => constants.GET_VACANCIES + vacancyId
        }),
        getCategories: builder.query({
            query: () => ({ url: constants.GET_CATEGORIES, method: 'GET', })
        }),
        getSkills: builder.query({
            query: () => ({ url: constants.GET_SKILLS, method: 'GET', })
        }),
        getvacancyWithMinPrice: builder.query({
            query: () => ({ url: constants.GET_VACANCY_WITH_MIN_PRICE, method: 'GET', })
        }),
        getvacancyWithMaxPrice: builder.query({
            query: () => ({ url: constants.GET_VACANCY_WITH_MAX_PRICE, method: 'GET', })
        }),
        getvacancyWithMinDuration: builder.query({
            query: () => ({ url: constants.GET_VACANCY_WITH_MIN_DURATION, method: 'GET', })
        }),
        getvacancyWithMaxDuration: builder.query({
            query: () => ({ url: constants.GET_VACANCY_WITH_MAX_DURATION, method: 'GET', })
        }),
    }),
});

export const {
    useGetVacanciesQuery,
    useGetVacancyByIdQuery,
    useGetCategoriesQuery,
    useGetSkillsQuery,
    useGetvacancyWithMinPriceQuery,
    useGetvacancyWithMaxPriceQuery,
    useGetvacancyWithMinDurationQuery,
    useGetvacancyWithMaxDurationQuery,
    useCreateJobMutation }
    = vacanciesApi;
