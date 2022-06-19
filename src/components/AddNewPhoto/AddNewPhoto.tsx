import React, { FC, useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import "swiper/css";
import AddNewPhotoForm from "./AddNewPhotoForm";
import Slider from "./Slider";
import { ReactComponent as DeleteIcon } from "../../assets/icons/bin.svg";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
  addCharacterPhoto,
  addNewUserPhoto,
  deleteUserPhoto,
} from "../../store/slices/photosSlice";
import { Photo } from "../../types/store/photos";

export interface PhotoInterface {
  url: string;
  id: string;
}

const AddNewPhoto: FC = () => {
  const [needsAdding, setNeedsAdding] = useState<boolean>(false);
  const { currentCharacter } = useAppSelector((state) => state.characters);
  const { photos } = useAppSelector((state) => state.photos);
  const [currentPhotos, setCurrentPhotos] = useState<Photo[] | null>(null);
  const { isAuthed } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentCharacter) {
      dispatch(addCharacterPhoto(currentCharacter));
    }
  }, [currentCharacter, dispatch]);

  useEffect(() => {
    const characterPhotos = photos.find(
      (photo) => currentCharacter && photo.id === currentCharacter.id
    );
    if (characterPhotos) setCurrentPhotos(characterPhotos.userPhotos);
  }, [photos, currentCharacter]);

  const handleAddPhoto = (url: string) => {
    if (currentCharacter)
      dispatch(
        addNewUserPhoto({
          character: currentCharacter,
          photo: { url, id: uuidv4() },
        })
      );
  };

  return (
    <div className="photos__container">
      <Slider photos={currentPhotos} />
      <Button
        className="btn btn--primary"
        onClick={() => {
          if (isAuthed) {
            setNeedsAdding((prev) => !prev);
          } else {
            navigate("/login");
          }
        }}
      >
        {needsAdding ? "Return" : "Add a new photo "}
      </Button>
      {needsAdding && <AddNewPhotoForm addPhoto={handleAddPhoto} />}
      {needsAdding &&
        currentPhotos &&
        currentCharacter &&
        currentPhotos.length > 0 &&
        currentPhotos.map(
          (photo, inx) =>
            inx !== 0 && (
              <div key={photo.id} className="photos__item">
                <DeleteIcon
                  onClick={() =>
                    dispatch(
                      deleteUserPhoto({
                        character: currentCharacter,
                        photoId: photo.id,
                      })
                    )
                  }
                />
                <p>{photo.url}</p>
              </div>
            )
        )}
    </div>
  );
};

export default AddNewPhoto;
