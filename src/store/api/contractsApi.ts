import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';
import { RootState } from 'store';
import { IContract } from 'types/contracts';

export const contractsApi = createApi({
    reducerPath: 'contractsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL, prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth;
            if (token) {
                headers.set('token', token);
            }
            headers.set('Access-Control-Allow-Origin', '*')
            return headers
        },
    }),
    endpoints: (builder) => ({
        getFreelancerContracts: builder.mutation<IContract[], void>({
            query: () => {
                return {
                    url: constants.CONTRACTS_FREELANCER,
                    method: 'get',
                };
            },
        }),
        getJobOwnerContracts: builder.mutation<IContract[], void>({
            query: () => {
                return {
                    url: constants.CONTRACTS_OWNER,
                    method: 'get',
                };
            },
        }),
        updateContract: builder.mutation({
            query: (body) => {
                return {
                    url: constants.CONTRACTS_UPDATE,
                    method: 'put',
                    body
                }
            }
        }),
    }),
});

export const { useGetFreelancerContractsMutation,
    useGetJobOwnerContractsMutation, 
    useUpdateContractMutation,
 } = contractsApi;
