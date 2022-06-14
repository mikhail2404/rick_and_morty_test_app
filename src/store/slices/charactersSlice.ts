import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CharacterInterface,
  CharactersState,
} from "../../types/store/characters";

export const fetchCharacters = createAsyncThunk<
  CharacterInterface[],
  number,
  { rejectValue: string }
>("characters/fetchCharacters", async function (page, { rejectWithValue }) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  if (!response.ok) {
    return rejectWithValue("Server Error");
  }
  const data = await response.json();
  return data.results;
});

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload;
        state.loading = false;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.error = action.error.message || "";
        state.loading = false;
      });
  },
});

export default charactersSlice.reducer;
