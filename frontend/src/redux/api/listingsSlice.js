import { LISTING_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const ListingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllListing: builder.query({
      query: () => LISTING_URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Listings", id: _id })),
              { type: "Listings", id: "LIST" },
            ]
          : [{ type: "Listings", id: "LIST" }],
    }),

    getListByID: builder.query({
      query: (id) => ({
        url: `${LISTING_URL}/${id}`,
        credentials: "include",
      }),

      providesTags: (result, error, id) => [{ type: "Listings", id }],
    }),

    createListing: builder.mutation({
      query: (data) => ({
        url: LISTING_URL,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: [{ type: "Listings", id: "LIST" }],
    }),

    editListByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `${LISTING_URL}/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Listings", id }],
    }),

    deleteListByID: builder.mutation({
      query: (id) => ({
        url: `${LISTING_URL}/${id}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Listings", id },
        { type: "Listings", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllListingQuery,
  useGetListByIDQuery,
  useCreateListingMutation,
  useEditListByIDMutation,
  useDeleteListByIDMutation,
} = ListingsApiSlice;
