import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./slices/charactersSlice";
import infoSlice from "./slices/infoSlice";

export const store = configureStore({
  reducer: {
    characters: charactersSlice,
    info: infoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
