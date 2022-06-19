import React from "react";
import Spinner from "../../ui/spinner/Spinner";
import Modal from "react-modal";
import { useAppSelector } from "../../hooks/useAppSelector";

Modal.setAppElement("#root");

const OverlayWithSpinner = () => {
  const { loading: charactersLoading } = useAppSelector(
    (state) => state.characters
  );
  const { loading: infoLoading } = useAppSelector((state) => state.info);
  return (
    <>
      <Modal
        isOpen={charactersLoading || infoLoading}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 10,
          },
          content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            background: "transparent",
          },
        }}
      >
        <Spinner />
      </Modal>
    </>
  );
};

export default OverlayWithSpinner;
