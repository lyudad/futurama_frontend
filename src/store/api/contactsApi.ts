import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';
import { RootState } from 'store';

interface ContactsResponse {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    photo: string
    role: string
    password: string
}

export const contactsApi = createApi({

    reducerPath: 'contactsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_URL,
        prepareHeaders: (headers, { getState }) => {
            const { token } = (getState() as RootState).auth  
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getContacts: build.query<ContactsResponse, void>({
            query: () => {
                return {
                    url: constants.USER_CONTACTS,
                    method: 'get'
                };
            },
            providesTags: [{ type: 'User', id: 'LIST' }],
        }),
        setContacts: build.mutation({
            query: (body: {
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
            }) => {
                return {
                    url: constants.USER_CONTACTS,
                    method: "post",
                    body

                };
            },
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    }),
});

export const { useGetContactsQuery, useSetContactsMutation } = contactsApi;
