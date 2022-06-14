import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchInfo, setCurrentPage } from "../../store/slices/infoSlice";
import { fetchCharacters } from "../../store/slices/charactersSlice";
import Pagination from "../../components/Paginator/Pagination";
import { useAppSelector } from "../../hooks/useAppSelector";
import Character from "../../components/Character/Character";

const Characters = () => {
  const dispatch = useAppDispatch();
  const { characters, error: charactersError } = useAppSelector(
    (state) => state.characters
  );
  const {
    currentPage,
    count,
    error: infoError,
  } = useAppSelector((state) => state.info);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage));
  }, [currentPage]);

  useEffect(() => {
    dispatch(fetchInfo());
  }, []);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div className="characters">
      {!charactersError && !infoError ? (
        <>
          <div className="characters__paginator">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              siblingCount={1}
              totalCount={count}
              pageSize={20}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="characters__content">
            {characters.map((character) => (
              <Character
                key={character.id}
                image={character.image}
                name={character.name}
                status={character.status}
                character={character}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="error">{charactersError || infoError}</p>
      )}
    </div>
  );
};

export default Characters;
