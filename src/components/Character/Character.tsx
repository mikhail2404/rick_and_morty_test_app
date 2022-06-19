import React, { FC } from "react";
import Card from "../../ui/card/Card";
import { CharacterInterface } from "../../types/store/characters";
import { ReactComponent as Like } from "../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "../../assets/icons/dislike.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { isFavourite } from "../../helpers/isFavourite";
import { isDisliked } from "../../helpers/isDisliked";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addDisliked, addFavourite } from "../../store/slices/favouriteSlice";

interface CharacterProps {
  character: CharacterInterface;
}

const Character: FC<CharacterProps> = ({ character }) => {
  const { favourite, disliked } = useAppSelector((state) => state.favourite);
  const { isAuthed } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddFavorite = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (isAuthed) {
      dispatch(addFavourite(character));
    } else {
      navigate("/login");
    }
  };

  const onAddDisliked = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();
    if (isAuthed) {
      dispatch(addDisliked(character));
    } else {
      navigate("/login");
    }
  };

  return (
    <Card
      func={() => navigate(`/character/${character.id}`)}
      className="character"
    >
      <div className="character__clickable">
        <img
          src={character.image}
          alt={character.name}
          className="character__image"
        />
        <h4>{character.name}</h4>
      </div>
      <p>{character.status}</p>
      <div className="character__rating">
        <Like
          className={`character__like ${
            isAuthed &&
            isFavourite(favourite, character) &&
            "character__like--active"
          }`}
          onClick={(e) => onAddFavorite(e)}
        />
        <Dislike
          className={`character__dislike ${
            isAuthed &&
            isDisliked(disliked, character) &&
            "character__dislike--active"
          }`}
          onClick={(e) => onAddDisliked(e)}
        />
      </div>
    </Card>
  );
};

export default Character;
