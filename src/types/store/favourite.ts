import { CharacterInterface } from "./characters";

export interface FavouriteState {
  favourite: CharacterInterface[];
  disliked: CharacterInterface[];
}
