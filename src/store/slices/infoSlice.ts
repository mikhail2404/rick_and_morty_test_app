import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Info, InfoState } from "../../types/store/info";

export const fetchInfo = createAsyncThunk<
  Info,
  undefined,
  { rejectValue: string }
>("info/fetchInfo", async function (_, { rejectWithValue }) {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  if (!response.ok) {
    return rejectWithValue("Server Error");
  }
  const data = await response.json();
  return data.info;
});

const initialState: InfoState = {
  count: 0,
  pages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.pages = action.payload.pages;
        state.loading = false;
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        state.error = action.error.message || "";
        state.loading = false;
      });
  },
});

export const { setCurrentPage } = infoSlice.actions;

export default infoSlice.reducer;
