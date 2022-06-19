export interface CharactersState {
  characters: CharacterInterface[];
  currentCharacter: CharacterInterface | null;
  loading: boolean;
  error: null | string;
}

export interface CharacterInterface {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  isFavorite?: boolean;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
