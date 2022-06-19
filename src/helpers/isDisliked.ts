import { CharacterInterface } from "../types/store/characters";

export const isDisliked = (
  disliked: CharacterInterface[],
  character: CharacterInterface
) => {
  return !!disliked.find((dis) => dis.id === character.id);
};
