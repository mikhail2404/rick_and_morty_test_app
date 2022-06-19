import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Photo, PhotosState } from "../../types/store/photos";
import { CharacterInterface } from "../../types/store/characters";
import { v4 as uuidv4 } from "uuid";

const initialState: PhotosState = {
  photos: [],
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addNewUserPhoto(
      state,
      action: PayloadAction<{ character: CharacterInterface; photo: Photo }>
    ) {
      state.photos.map((photo) => {
        if (photo.id === action.payload.character.id) {
          return photo.userPhotos.push(action.payload.photo);
        }
        return photo;
      });
    },
    addCharacterPhoto(state, action: PayloadAction<CharacterInterface>) {
      const currentCharacterPhotos = state.photos.find(
        (photo) => photo.id === action.payload.id
      );
      if (!currentCharacterPhotos) {
        state.photos.push({
          userPhotos: [{ url: action.payload.image, id: uuidv4() }],
          id: action.payload.id,
        });
      }
    },
    deleteUserPhoto(
      state,
      action: PayloadAction<{ character: CharacterInterface; photoId: string }>
    ) {
      const currentCharacterPhotos = state.photos.find(
        (photo) => photo.id === action.payload.character.id
      );
      if (currentCharacterPhotos)
        currentCharacterPhotos.userPhotos =
          currentCharacterPhotos.userPhotos.filter(
            (photo) => photo.id !== action.payload.photoId
          );
    },
  },
});

export const { addNewUserPhoto, addCharacterPhoto, deleteUserPhoto } =
  photosSlice.actions;

export default photosSlice.reducer;
