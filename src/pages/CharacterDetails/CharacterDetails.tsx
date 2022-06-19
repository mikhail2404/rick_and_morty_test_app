import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchCurrentCharacter } from "../../store/slices/charactersSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import AddNewPhoto from "../../components/AddNewPhoto/AddNewPhoto";

const CharacterDetails: React.FC = () => {
  const { currentCharacter, error } = useAppSelector(
    (state) => state.characters
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(fetchCurrentCharacter(id));
  }, [id, dispatch]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <>
      {currentCharacter && id && currentCharacter.id === +id && (
        <div className="character-details">
          <AddNewPhoto />
          <div className="character-details__info">
            <h1>{currentCharacter.name}</h1>
            <p>Species: {currentCharacter.species}</p>
            <p>Status: {currentCharacter.status}</p>
            <p>Gender: {currentCharacter.gender}</p>
            <p>Created: {currentCharacter.created}</p>
            <p>
              Location: {currentCharacter.location.name},{" "}
              {currentCharacter.location.url}
            </p>
            <p>
              Episodes:{" "}
              {currentCharacter.episode.map((ep, index) => (
                <span key={index}>{ep}; </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterDetails;
