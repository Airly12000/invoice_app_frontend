import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

interface Props {
  modalTitle: string;
  modalBody: string;
  modalButton: string;
  openModal: boolean;
  setOpenModal: any;
  handleSubmit: any;
}

function ValidationModal({
  modalTitle,
  modalBody,
  modalButton,
  openModal,
  setOpenModal,
  handleSubmit,
}: Props) {
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    switch (modalButton) {
      case "deleteButton":
        setButtonName("Delete");
        break;
      case "markButton":
        setButtonName("Mark as Paid");
        break;
      default:
        return;
    }
  }, [buttonName, modalButton]);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={openModal}
      onHide={() => setOpenModal(false)}
    >
      <Modal.Header id="myModal" className="col-black fs-12 px-4 pt-5 variant1">
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="myModal" className="text-color fs-12 px-4">
        {modalBody}
      </Modal.Body>
      <Modal.Footer id="myModal" className="variant pt-3 pb-4 pe-4">
        <button
          className="btn border border-0 rounded-pill mx-1"
          onClick={() => setOpenModal(false)}
          id="editButton"
        >
          <span className="f-w fs-12">Cancel</span>
        </button>
        <button
          type="submit"
          className="btn border border-0 rounded-pill mx-1"
          onClick={handleSubmit}
          id={modalButton}
        >
          <span className="f-w fs-12">{buttonName}</span>
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ValidationModal;
