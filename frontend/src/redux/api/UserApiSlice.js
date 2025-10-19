import { USERS_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const UserSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = UserSlice;
