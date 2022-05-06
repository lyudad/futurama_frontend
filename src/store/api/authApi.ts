import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { constants } from "constants/urls";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
  endpoints: (builder) => ({
    signinGoogle: builder.mutation({
      query: () => {
        return {
          url: constants.USER_LOGIN_WITH_GOOGLE,
          method: "get",
        };
      },
    }),

    signinUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: constants.USER_LOGIN,
          method: "post",
          body,
        };
      },
    }),
    setData: builder.mutation({
      query: (body: {        
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        user: string;
      }) => {
        return {
          url: constants.USER_CONTACTS,
          method: "post",
          body

        };
      },
    }),
  }),
});

export const {
  useSigninUserMutation,
  useSigninGoogleMutation,
  useSetDataMutation,
} = authApi;
