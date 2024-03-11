import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bookApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:9000` }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["books"],
    }),
    storeBook: builder.mutation({
      query: ({ addBook }) => ({
        url: "/books",
        method: "POST",
        body: addBook,
      }),
      invalidatesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (param) => ({
        url: `/books/${param}`,
        method: "GET",
      }),
    }),
    editBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useStoreBookMutation,
  useDeleteBookMutation,
  useSingleBookQuery,
  useEditBookMutation,
} = bookApiSlice;
