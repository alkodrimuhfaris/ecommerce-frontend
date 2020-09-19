import React from 'react';
import {
  Button,
  Row,
  Container,
  Col
} from 'reactstrap';

class ItemTable extends React.Component{
  render(){
    const { data } = this.props
    return(
      <Container>
        <Button onClick={() => this.props.openNew()} color="success" className = "my-3 rounded-pill" >+ Add new</Button>
        <Row xs="2">
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='2' xs='3'><span className='text-center'>Item ID</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item name</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item price</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='4' xs='3'><span className='text-center'>Action</span></Col>
        </Row>
        {Object.keys(data).length && data.map(item => {
          return(
            <Row xs="2">
              <Col md='2' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span>{item.id}</span></Col>
              <Col md='3' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span>{item.name}</span></Col>
              <Col md='3' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span>{item.price}</span></Col>
              <Col md='4' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'>
                <Row className='row justify-content-around'>
                  <div className='col-md-4 d-flex align-items-center justify-content-center my-1' xs='12'>
                    <Button 
                    
                    onClick ={() => this.props.openDetail(item.id, 0) }
                    
                    color="success" className = "rounded-pill" >Detail</Button>
                  </div>
                  <div className='col-md-4 d-flex align-items-center justify-content-center my-1' xs='12'>
                    <Button 
                    
                    onClick ={() => this.props.openDelete(item.id, 1) }
                    
                    color="danger" className = "rounded-pill">Delete</Button>
                  </div>
                </Row>
              </Col>
            </Row>
          )
        })}
      </Container>
    )
  }
}

export default ItemTable