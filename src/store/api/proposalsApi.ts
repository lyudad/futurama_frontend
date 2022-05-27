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

    endpoints: (build) => ({
        sendProposal: build.mutation({
            query: (body) => {
                return {
                    url: constants.SEND_PROPOSAL,
                    method: "post",
                    body
                };
            },
        }),
    }),
});

export const { useSendProposalMutation } = proposalsApi;
