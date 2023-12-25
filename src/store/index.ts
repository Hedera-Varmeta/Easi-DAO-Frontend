/* eslint-disable no-underscore-dangle */
import { configureStore } from "@reduxjs/toolkit";
import { __prod__ } from "utils/constants";
import createRootReducer from "./ducks/rootReducer";

const store = configureStore({
  reducer: createRootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  devTools: !__prod__,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
