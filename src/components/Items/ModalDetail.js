import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col
} from 'reactstrap';

class ModalDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpenDetail: false
    }
  }

  openModalUpdate = (dataItem) => {
    this.setState({
      modalOpenUpdate: false,
    })
  }

  render(){
    const { dataItem } = this.props
    return(
      <React.Fragment>
        {/* modal for read */}
        <Modal isOpen={this.props.modalOpenDetail}>
            <ModalHeader>Details</ModalHeader>
            <ModalBody>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Item ID</Col>
                <Col xs={8} className='ml-1'>{`${dataItem.id}`}</Col>
              </Row>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Item Name</Col>
                <Col xs={8} className='ml-1'>{`${dataItem.name}`}</Col>
              </Row>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Categry ID</Col>
                <Col xs={8} className='ml-1'>{`${dataItem.category_id}`}</Col>
              </Row>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Item Price</Col>
                <Col xs={8} className='ml-1'>{`${dataItem.price}`}</Col>
              </Row>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Item Description</Col>
                <Col xs={8} className='ml-1'>{`${dataItem.description}`}</Col>
              </Row>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Created at</Col>
                <Col xs={8} className='ml-1'>{`${new Date (dataItem.created_at)}`}</Col>
              </Row>
              <Row className = 'my-3'>
                <Col xs={3} className='mr-1'>Updated at </Col>
                <Col xs={8} className='ml-1'>{`${new Date (dataItem.updated_at)}`}</Col>
              </Row>
              <Button color="success" onClick={ () => this.props.openUpdate() } className = "rounded-pill">Update</Button>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.props.modalCloseDetail} className = "rounded-pill">Close</Button>
            </ModalFooter>
          </Modal>
      </React.Fragment>
    )
  }
}

export default ModalDetail;