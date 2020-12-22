import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

export default function ModalConfirm({
  modalOpen = false,
  title = 'Warning',
  content = 'Are you sure want to delete this?',
  confirm = () => {},
  confirmTxt = 'Yes',
  close = () => {},
  closeTxt = 'No',
}) {
  return (
    <>
      <Modal isOpen={modalOpen}>
        <ModalHeader>
          <div className="d-flex align-items-center">
            <text>{title}</text>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center">
            <text>{content}</text>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-around">
          <Button
            color="success"
            onClick={() => confirm()}
            className="rounded-pill">
            {confirmTxt}
          </Button>
          <Button
            color="danger"
            onClick={() => close()}
            className="rounded-pill">
            {closeTxt}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
