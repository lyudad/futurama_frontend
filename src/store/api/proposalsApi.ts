import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';
import { RootState } from 'store';

export const proposalsApi = createApi({
    reducerPath: 'sendProposalApi',
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
    tagTypes: ['Proposal'],
    endpoints: (build) => ({
        sendProposal: build.mutation({
            query: (body) => {
                return {
                    url: constants.SEND_PROPOSAL,
                    method: "post",
                    body
                };
            },
            invalidatesTags: [{ type: 'Proposal', id: 'LIST' }],
        }),
        getMyProposals: build.query<[], void>({
            query: () => {
                return {
                    url: constants.GET_PROPOSALS,
                    method: "get"
                };
            },
        }),
        getMyInvites: build.query<[], void>({
            query: () => {
                return {
                    url: constants.GET_INVITES,
                    method: "get"
                };
            },
        }),
        checkProposalIsExist: build.query<boolean, number>({
            query: (vacancyId) => {
                return {
                    url: constants.CHECK_PROPOSAL + vacancyId,
                    method: "get"
                };
            },
            providesTags: [{ type: 'Proposal', id: 'LIST' }],
        }),
    }),
});

export const {
    useSendProposalMutation,
    useGetMyProposalsQuery,
    useCheckProposalIsExistQuery,
    useGetMyInvitesQuery } = proposalsApi;
