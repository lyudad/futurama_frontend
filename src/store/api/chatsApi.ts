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
























// let socket: Socket;
// function getSocket() {
//     if (!socket) {
//         socket = io(`${process.env.REACT_APP_URL}`, {
//             withCredentials: false,
//         });
//     }
//     return socket;
// }



// export const chatsApi = createApi({
//     reducerPath: 'chatsApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: process.env.REACT_APP_URL,
//         prepareHeaders: (headers, { getState }) => {
//             const { token } = (getState() as RootState).auth;
//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//             }
//             headers.set('Access-Control-Allow-Origin', '*');
//             return headers;
//         },
//     }),
//     tagTypes: ['Chats'],
//     endpoints: (build) => ({
//         sendMessage: build.mutation({
//             query: (body) => {
//                 return {
//                     url: constants.SEND_MESSAGE,
//                     method: "post",
//                     body
//                 };
//             },
//             invalidatesTags: ['Chats'],
//         }),
//         getMyChats: build.query<[], void>({
//             query: () => {
//                 return {
//                     url: constants.GET_MY_CHATS,
//                     method: "get"
//                 };
//             },
//             providesTags: [{ type: 'Chats' }],
//         }),
//         getMesagesByChatId: build.query<[], number>({
//             query: (chatId) => {
                
//                 return {
//                     url: constants.GET_MESSAGES + chatId,
//                     method: "get"
//                 };
//             },
//             async onCacheEntryAdded(
//                 photoId,
//                 { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
//             ) {
//                 try {
//                     await cacheDataLoaded;

//                     const socket = getSocket();

//                     socket.on('connect', () => {
//                         socket.emit('request_all_messages');
//                     });

//                     socket.on( 'send_all_messages', (messages: []) => {
//                         updateCachedData((draft) => {
//                             draft.splice(0, draft.length, ...messages);
//                         });
//                     });

//                     // socket.on('receive_message', (message: IMessage) => {
//                     //     updateCachedData((draft) => {
//                     //         draft.push(message);
//                     //     });
//                     // });

//                     await cacheEntryRemoved;

//                     socket.off('connect');
//                     socket.off('send_all_messages');
//                     socket.off('receive_message');
//                 } catch {
//                     // if cacheEntryRemoved resolved before cacheDataLoaded,
//                     // cacheDataLoaded throws
//                 }
//             },
//             providesTags: [{ type: 'Chats' }],
//         }),

//     }),
// });


// export const { useGetMyChatsQuery, useGetMesagesByChatIdQuery, useSendMessageMutation } = chatsApi;








// enum ChatEvent {
//     SendMessage = 'send_message',
//     RequestAllMessages = 'request_all_messages',
//     SendAllMessages = 'send_all_messages',
//     ReceiveMessage = 'receive_message',
// }

// let socket: Socket;
// function getSocket() {
//     if (!socket) {
//         socket = io(`${process.env.REACT_APP_URL}`, {
//             withCredentials: true,
//         });
//     }
//     return socket;
// }


//     endpoints: (builder) => ({

//         sendMessage: builder.mutation<IMessage, IMessage>({
//             queryFn: (chatMessageContent: IMessage) => {
//                 const socket = getSocket();
//                 return new Promise(resolve => {
//                     socket.emit(ChatEvent.SendMessage, chatMessageContent, (message: IMessage) => {
//                         resolve({ data: message });
//                     });
//                 });
//             },
//         }),
//         getMessages: builder.query<IMessage[], void>({
//             queryFn: () => ({ data: [] }),
//             async onCacheEntryAdded(
//                 photoId,
//                 { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
//             ) {
//                 try {
//                     await cacheDataLoaded;

//                     const socket = getSocket();

//                     socket.on('connect', () => {
//                         socket.emit(ChatEvent.RequestAllMessages);
//                     });

//                     socket.on(ChatEvent.SendAllMessages, (messages: IMessage[]) => {
//                         updateCachedData((draft) => {
//                             draft.splice(0, draft.length, ...messages);
//                         });
//                     });

//                     socket.on(ChatEvent.ReceiveMessage, (message: IMessage) => {
//                         updateCachedData((draft) => {
//                             draft.push(message);
//                         });
//                     });

//                     await cacheEntryRemoved;

//                     socket.off('connect');
//                     socket.off(ChatEvent.SendAllMessages);
//                     socket.off(ChatEvent.ReceiveMessage);
//                 } catch {
//                     // if cacheEntryRemoved resolved before cacheDataLoaded,
//                     // cacheDataLoaded throws
//                 }
//             },
//         }),
//         getMyChats: builder.query<[], void>({
//             query: () => {
//                 return {
//                     url: constants.GET_MY_CHATS,
//                     method: "get"
//                 };
//             },
//         }),
//         getMesagesByChatId: builder.query<[], number>({
//             query: (chatId) => {
//                 return {
//                     url: constants.GET_MESSAGES + chatId,
//                     method: "get"
//                 };
//             },
//         }),
//     }),
// });