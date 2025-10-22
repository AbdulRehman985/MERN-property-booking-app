import { LISTING_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const ListingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ 1. Get all listings
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

    // ✅ 2. Get listing by ID
    getListByID: builder.query({
      query: (id) => ({
        url: `${LISTING_URL}/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "Listings", id }],
    }),

    // ✅ 3. Create new listing
    createListing: builder.mutation({
      query: (data) => ({
        url: LISTING_URL,
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: [{ type: "Listings", id: "LIST" }],
    }),

    // ✅ 4. Edit listing
    editListByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `${LISTING_URL}/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Listings", id }],
    }),

    // ✅ 5. Add review (auto cache update + optimistic UI)
    addReviewListing: builder.mutation({
      query: ({ id, comment, rating }) => ({
        url: `${LISTING_URL}/${id}/review`,
        method: "POST",
        credentials: "include",
        body: { comment, rating },
      }),

      // 🔥 Automatically refresh that product after review
      invalidatesTags: (result, error, { id }) => [{ type: "Listings", id }],

      // ⚡ Optimistic UI (instant feedback)
      async onQueryStarted(
        { id, comment, rating },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          ListingsApiSlice.util.updateQueryData("getListByID", id, (draft) => {
            draft.reviews.push({
              _id: Date.now().toString(),
              name: "You",
              comment,
              rating,
            });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // ✅ 6. Delete listing
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
  useAddReviewListingMutation,
  useEditListByIDMutation,
  useDeleteListByIDMutation,
} = ListingsApiSlice;
