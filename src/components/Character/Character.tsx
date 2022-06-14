import React, { FC } from "react";
import Card from "../../ui/card/Card";
import { CharacterInterface } from "../../types/store/characters";
import { ReactComponent as Like } from "../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "../../assets/icons/dislike.svg";

interface CharacterProps {
  image: string;
  name: string;
  status: string;
  character: CharacterInterface;
}

const Character: FC<CharacterProps> = ({ image, status, name }) => {
  return (
    <Card className="character">
      <img src={image} alt={name} className="character__image" />
      <h4>{name}</h4>
      <p>{status}</p>
      <div className="character__rating">
        <Like />
        <Dislike />
      </div>
    </Card>
  );
};

export default Character;
