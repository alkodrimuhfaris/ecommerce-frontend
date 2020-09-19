import React from 'react';
import {default as axios} from 'axios';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

class ModalDelete extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      url: '',
      delMessage:
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className='text-center'>Are you sure want to delete?</span>
          </div>
          <div className='d-flex justify-content-center'>
            <Button color="danger" onClick={ () => this.deleteItem(this.props.url)} className = "rounded-pill">DELETE</Button>
          </div>
        </div> 
    }
  }

  deleteItem = async (url) => {
    const del = await axios.delete(url)
    const message = del.data.message
    this.setState({
      delMessage: 
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className='text-center'>{message}</span>
          </div>
        </div>
    })
  }

  closeModalDelete = () => {
    this.setState({
      delMessage:
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className='text-center'>Are you sure want to delete?</span>
          </div>
          <div className='d-flex justify-content-center'>
            <Button color="danger" onClick={ () => this.deleteItem(this.state.url)} className = "rounded-pill">DELETE</Button>
          </div>
        </div>
    })
  }

  modalDelete = () => {
    this.setState({
      modalOpenDelete: this.props.modalOpenDelete
    })

  }

  render(){
    return(
      <React.Fragment>
        {/* modal for delete */}
        <Modal isOpen={this.props.modalOpenDelete}>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalBody>
            {this.state.delMessage}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={ () => this.props.modalCloseDelete(this.closeModalDelete)} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ModalDelete