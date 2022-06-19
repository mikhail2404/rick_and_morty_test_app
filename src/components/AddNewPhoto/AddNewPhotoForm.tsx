import React, { FC, FormEvent, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddNewPhotoFormProps {
  addPhoto: (photo: string) => void;
}

const AddNewPhotoForm: FC<AddNewPhotoFormProps> = ({
  addPhoto,
}) => {
  const newPhotoRef = useRef<HTMLInputElement>(null);

  const handleAddNewPhoto = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPhoto((newPhotoRef.current as HTMLInputElement).value);
    (newPhotoRef.current as HTMLInputElement).value = "";
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleAddNewPhoto}>
        <div className="input-group">
          <input
            placeholder="New photo URL"
            aria-label="New photo URL"
            className="form-control"
            ref={newPhotoRef}
          />
          <button type="submit" className="btn btn-outline-secondary">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddNewPhotoForm;
