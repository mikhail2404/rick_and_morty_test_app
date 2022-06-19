import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authState } from "../../types/store/auth";

const initialState: authState = {
  isAuthed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthed(state, action: PayloadAction<boolean>) {
      state.isAuthed = action.payload;
    },
  },
});

export const { setIsAuthed } = authSlice.actions;

export default authSlice.reducer;
