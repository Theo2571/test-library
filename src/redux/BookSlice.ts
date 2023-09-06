import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FetchBooksPayload,
  LibraryBooks,
  LibraryState,
} from "../types/BooksAPI";

const BASE_URL = "https://www.googleapis.com/books/v1/";

const initialState: LibraryState = {
  queryResult: "",
  categoryResult: "",
  sortResult: "",
  LibraryBooks: null,
  isSearch: false,
  selectedBook: [],
  loading: false,
};

export const getBooks = createAsyncThunk<
  LibraryBooks & {
    isSearch: boolean;
    query: string;
    category: string;
    sort: string;
  },
  FetchBooksPayload
>("library/getBooks", async ({ query, category, sort, startIndex }) => {
  const isSearch = query.length > 0 || category.length > 0 || sort.length > 0;
  const res = await axios.get(
    `${BASE_URL}volumes?q=${query}+subject:${category}${
      sort ? `&orderBy=${sort}` : ""
    }&startIndex=${startIndex}&maxResults=30&key=AIzaSyCnSQZq-lATvt09mx3uSJjDxcbD-jNKAcM`,
  );

  return { ...res.data, isSearch, query, category, sort };
});
export const getBookDetails = createAsyncThunk(
  "library/getBookDetails",
  async (bookId: string) => {
    const res = await axios.get(
      `${BASE_URL}volumes/${bookId}?key=AIzaSyCnSQZq-lATvt09mx3uSJjDxcbD-jNKAcM`, // Измените API ключ
    );
    return res.data;
  },
);

const BookSlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setIsSearch: (state, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isSearch = action.payload.isSearch;
      state.queryResult = action.payload.query;
      state.categoryResult = action.payload.category;
      state.sortResult = action.payload.sort;
      const { items, totalItems } = action.payload;
      if (state.isSearch) {
        state.LibraryBooks = action.payload;
      } else if (state.LibraryBooks) {
        state.LibraryBooks.items = [
          ...(state.LibraryBooks.items || []),
          ...(items || []),
        ];
        state.LibraryBooks.totalItems = totalItems;
      } else {
        state.LibraryBooks = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(getBooks.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getBookDetails.fulfilled, (state, action) => {
      state.selectedBook = action.payload.volumeInfo;
    });
  },
});

export const { setIsSearch } = BookSlice.actions;
export const BookSliceReducer = BookSlice.reducer;
