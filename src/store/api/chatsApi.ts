import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { constants } from 'constants/urls';
import { RootState } from 'store';


export const chatsApi = createApi({
    reducerPath: 'chatsApi',
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
        sendMessage: build.mutation({
            query: (body) => {
                return {
                    url: constants.SEND_MESSAGE,
                    method: "post",
                    body
                };
            },
        }),
        getMyChats: build.query<[], void>({
            query: () => {
                return {
                    url: constants.GET_MY_CHATS,
                    method: "get"
                };
            },
        }),
        getMesagesByChatId: build.query<[], number>({
            query: (chatId) => {
                return {
                    url: constants.GET_MESSAGES + chatId,
                    method: "get"
                };
            },
        }),


    }),
});

export const { useGetMyChatsQuery, useGetMesagesByChatIdQuery, useSendMessageMutation } = chatsApi;