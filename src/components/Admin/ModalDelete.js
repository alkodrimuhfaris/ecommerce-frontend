import React from 'react';
import {default as axios} from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container
} from 'reactstrap';

class ModalDelete extends React.Component{
  deleteItem = async (url) => {
    const del = await axios.delete(url)
    const message = `${this.props.dataItem.name} has been deleted from the list`
    this.props.modalCloseDelete('del')
    this.props.modalCloseDelete('dtl')
    window.alert(message)
  }

  render(){
    return(
      <React.Fragment>
        {/* modal for delete */}
        <Modal isOpen={this.props.modalOpenDelete}>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalBody>
            <Container>
              <div>
                <div className="d-flex align-items-center justify-content-center">
                  <span className='text-center'>Are you sure want to delete {this.props.dataItem.name} on the list?</span>
                </div>
                <div className='d-flex justify-content-center'>
                  <Button color="danger" onClick={ () => this.deleteItem(this.props.url)} className = "rounded-pill">DELETE</Button>
                </div>
              </div>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={ () => this.props.modalCloseDelete('del')} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ModalDelete