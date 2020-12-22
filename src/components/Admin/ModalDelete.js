import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
} from 'reactstrap';
import {connect} from 'react-redux';
import adminAction from '../../redux/actions/admin';
import ModalLoading from '../ModalLoading';

class ModalDelete extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.adminDelete.deleteItemPending !==
      this.props.adminDelete.deleteItemPending
    ) {
      if (this.props.adminDelete.deleteItemSuccess) {
        this.props.modalCloseDelete('del');
        // eslint-disable-next-line no-undef
        alert(`${this.props.deleteName} has been deleted from the list`);
      }
    }
  }

  deleteItem = () => {
    this.props.deleteItem(this.props.auth.token, this.props.item_id);
  };

  render() {
    return (
      <>
        {/* modal for delete */}
        <Modal isOpen={this.props.modalOpenDelete}>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalBody>
            <Container>
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <span className="text-center">
                    Are you sure want to delete {this.props.deleteName} on the
                    list?
                  </span>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    color="danger"
                    onClick={() => this.deleteItem(this.props.url)}
                    className="rounded-pill">
                    DELETE
                  </Button>
                  <ModalLoading
                    modalOpen={this.props.adminDelete.deleteItemPending}
                  />
                </div>
              </div>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => this.props.modalCloseDelete('del')}
              className="rounded-pill">
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  adminDelete: state.adminDelete,
});

const mapDispatchToProps = {
  deleteItem: adminAction.deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDelete);
