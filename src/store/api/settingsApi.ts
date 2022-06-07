import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL, prepareHeaders: (headers) => {
            headers.set('Access-Control-Allow-Origin', '*')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getSkills: builder.mutation({
            query: () => {
                return {
                    url: constants.GET_SKILLS,
                    method: 'get',
                };
            },
        }),
        getPositions: builder.mutation({
            query: () => {
                return {
                    url: constants.GET_CATEGORIES,
                    method: 'get',
                };
            },
        }),
        updateProfile: builder.mutation({
            query: (body) => {
                return {
                    url: constants.POST_PROFILE,
                    method: 'post',
                    body,
                }
            }
        }),
        postExperience: builder.mutation({
            query: (body) => {
                return {
                    url: constants.POST_EXPERIENCE,
                    method: 'post',
                    body
                }
            }
        }),
        putExperience: builder.mutation({
            query: (body) => {
                return {
                    url: constants.PATCH_EXPERIENCE,
                    method: 'put',
                    body
                }
            }
        }),
        deleteExperience: builder.mutation({
            query: (id) => {
                return {
                    url: constants.DELETE_EXPERIENCE + id,
                    method: 'delete',
                }
            }
        }),
        postEducation: builder.mutation({
            query: (body) => {
                return {
                    url: constants.POST_EDUCATION,
                    method: 'post',
                    body
                }
            }
        }),
        putEducation: builder.mutation({
            query: (body) => {
                return {
                    url: constants.PATCH_EDUCATION,
                    method: 'put',
                    body
                }
            }
        }),
        deleteEducation: builder.mutation({
            query: (id) => {
                return {
                    url: constants.DELETE_EDUCATION + id,
                    method: 'delete',
                }
            }
        })
    }),
});

export const { useGetSkillsMutation, 
    useGetPositionsMutation, 
    useUpdateProfileMutation, 
    useDeleteEducationMutation,
    useDeleteExperienceMutation,
    usePutEducationMutation,
    usePutExperienceMutation,
    usePostEducationMutation,
    usePostExperienceMutation
 } = settingsApi;
