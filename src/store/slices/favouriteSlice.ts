import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {FavouriteState} from "../../types/store/favourite";
import {CharacterInterface} from "../../types/store/characters";
import {isFavourite} from "../../helpers/isFavourite";
import {isDisliked} from "../../helpers/isDisliked";

const initialState: FavouriteState = {
    favourite: [],
    disliked: []
};

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<CharacterInterface>) {
            if(isDisliked(state.disliked, action.payload)){
                state.disliked = state.disliked.filter(character => character.id !== action.payload.id)
            }
            if(!isFavourite(state.favourite, action.payload)){
                state.favourite.push(action.payload)
            }
        },
        addDisliked(state, action: PayloadAction<CharacterInterface>) {
            if(isFavourite(state.favourite, action.payload)){
                state.favourite =  state.favourite.filter(character => character.id !== action.payload.id)
            }
            if(!isDisliked(state.disliked, action.payload)){
                state.disliked.push(action.payload)
            }
        },
    },
});

export const { addFavourite, addDisliked } = favouriteSlice.actions;

export default favouriteSlice.reducer;