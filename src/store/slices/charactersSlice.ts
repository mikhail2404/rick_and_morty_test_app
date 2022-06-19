import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  CharacterInterface,
  CharactersState,
} from "../../types/store/characters";
import { CHARACTERS_URL } from "../../common/const";

export const fetchCharacters = createAsyncThunk<
  CharacterInterface[],
  number,
  { rejectValue: string }
>("characters/fetchCharacters", async function (page, { rejectWithValue }) {
  const response = await fetch(`${CHARACTERS_URL}/?page=${page}`);
  if (!response.ok) {
    return rejectWithValue("Something went wrong");
  }
  const data = await response.json();
  return data.results;
});

export const fetchCurrentCharacter = createAsyncThunk<
  CharacterInterface,
  string,
  { rejectValue: string }
>("characters/fetchCurrentCharacter", async function (id, { rejectWithValue }) {
  const response = await fetch(`${CHARACTERS_URL}/${id}`);
  if (!response.ok) {
    return rejectWithValue("Something went wrong");
  }
  const data = await response.json();
  return data;
});

const initialState: CharactersState = {
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<CharacterInterface[]>) {
      state.characters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload;
        state.loading = false;
      })
      .addCase(fetchCharacters.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentCharacter.fulfilled, (state, action) => {
        state.currentCharacter = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentCharacter.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
