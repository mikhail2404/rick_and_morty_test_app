import React, { useEffect, useRef, useState } from "react";
import { CharacterInterface } from "../../types/store/characters";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CHARACTERS_URL } from "../../common/const";

const CharacterSearch = () => {
  const [characterName, setCharacterName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CharacterInterface[]>([]);
  const [allCharacters, setAllCharacters] = useState<CharacterInterface[]>([]);
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);
  const { pages } = useAppSelector((state) => state.info);
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urls = Array.from(
      { length: pages },
      (_, i) => `${CHARACTERS_URL}/?page=${i + 1}`
    ); // creates an array of page urls
    (async () => {
      await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          const result = await response.json();
          setAllCharacters((prev) => [...prev, ...result.results]);
        })
      );
    })(); // fetches characters from each page and passes it to allCharacters state
  }, [pages]);

  useEffect(() => {
    if (characterName.trim().length) {
      const results = allCharacters.filter((character) =>
        character.name.toLowerCase().includes(characterName.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [characterName, allCharacters]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (
      formRef.current &&
      !formRef.current.contains(event.target as HTMLElement)
    ) {
      setIsDisplayed(false);
    }
  };

  const searchCharacterHandler = (id: number) => {
    setIsDisplayed(false);
    navigate(`/character/${id}`);
  };

  return (
    <form ref={formRef} className="character-search__form">
      <input
        value={characterName}
        onClick={() => setIsDisplayed(true)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCharacterName(e.target.value)
        }
        type="text"
        placeholder="Type character name"
        className={`character-search__input ${
          searchResults.length && isDisplayed
            ? "character-search__input--active"
            : ""
        }`}
      />
      {isDisplayed && (
        <div className="character-search__results">
          {searchResults.map((result) => (
            <div
              onClick={() => searchCharacterHandler(result.id)}
              className="character-search__result"
              key={result.id}
            >
              <LazyLoadImage
                alt={result.name}
                height={48}
                src={result.image} // use normal <img> attributes as props
                width={32}
              />
              {result.name}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default CharacterSearch;
