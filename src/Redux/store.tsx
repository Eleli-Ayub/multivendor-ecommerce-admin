import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import { LoaderSlice } from "./slices/Loaderslice";
import CategoryReducer from "./slices/CategoriesSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    loaders: LoaderSlice.reducer,
    categories: CategoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
