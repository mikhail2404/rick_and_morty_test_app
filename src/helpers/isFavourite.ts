import {CharacterInterface} from "../types/store/characters";

export const isFavourite = (favourite: CharacterInterface[], character: CharacterInterface) => {
    return !!favourite.find(fav  => fav.id === character.id)
}