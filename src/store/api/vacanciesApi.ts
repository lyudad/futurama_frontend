import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { constants } from 'constants/urls';
import { IvacancyQuery } from 'types/vacancy';
import { RootState } from 'store';

export const vacanciesApi = createApi({
    reducerPath: 'vacancies',
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
    tagTypes: ['Jobs'],
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
        getMyJobs: builder.query<[], void>({
            query: () => {
                return {
                    url: constants.GET_MY_JOBS,
                    method: "get"
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Jobs' as const, id })),
                        { type: 'Jobs', id: 'LIST' },
                    ]
                    : [{ type: 'Jobs', id: 'LIST' }],
        }),
        getMyJobsForCurrentUser: builder.query<[], number>({
            query: (id) => {
                return {
                    url: constants.GET_MY_JOBS + id,
                    method: "get"
                };
            },
            providesTags: [{ type: 'Jobs', id: 'LIST' }]
        }),
        changeJobStatus: builder.mutation({
            query: (body: { id: number, status: boolean; }) => {
                return {
                    url: constants.CHANGE_STATUS,
                    method: "post",
                    body
                };
            },
            invalidatesTags: [{ type: 'Jobs', id: 'LIST' }]
        }),
        deleteJob: builder.mutation({
            query: (body: { id: number; }) => {
                return {
                    url: constants.CHANGE_STATUS,
                    method: "delete",
                    body
                };
            },
            invalidatesTags: [{ type: 'Jobs', id: 'LIST' }]
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
    useCreateJobMutation,
    useChangeJobStatusMutation,
    useGetMyJobsQuery,
    useGetMyJobsForCurrentUserQuery,
    useDeleteJobMutation } = vacanciesApi;
