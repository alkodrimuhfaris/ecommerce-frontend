import React from 'react';
import {Modal, Button, Container} from 'reactstrap';
import {AiOutlineClose} from 'react-icons/ai';
import AddressComponents from '../Users/AddressComponent';

export default function ModalConfirm({
  selectedAddress = 0,
  modalOpen = false,
  addressSelector = false,
  selectAddress = () => {},
  close = () => {},
}) {
  const [openThis, setThisOpen] = React.useState(false);

  React.useEffect(() => {
    setThisOpen(modalOpen);
  }, [modalOpen]);

  const closeThis = () => {
    close();
    setThisOpen(false);
  };

  return (
    <>
      <Modal isOpen={openThis} size="lg">
        <div
          className="w-100 h-100 p-3 overflow-auto"
          style={{backgroundColor: '#fff', borderRadius: '3em'}}>
          <Button
            onClick={() => closeThis()}
            color="white"
            className="position-absolute btn-close">
            <AiOutlineClose
              color="danger"
              style={{width: '1em', height: '1em'}}
            />
          </Button>
          <Container
            className="p-3 overflow-auto header-container"
            style={{backgroundColor: '#fff'}}>
            <div className="d-flex justify-content-center">
              <h4>Change Your Address</h4>
            </div>
            <div className="d-flex justify-content-center">
              <text className="text-muted small">Change your address here</text>
            </div>
          </Container>
          <Container>
            <AddressComponents
              addressSelector={addressSelector}
              selectAddress={selectAddress}
              selectedAddress={selectedAddress}
            />
          </Container>
        </div>
      </Modal>
    </>
  );
}
