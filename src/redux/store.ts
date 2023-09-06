import { configureStore } from "@reduxjs/toolkit";
import { BookSliceReducer } from "./BookSlice";

export const store = configureStore({
  reducer: {
    BookSlice: BookSliceReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
