import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

class Footer extends Component{
  render(){
    return(
      <div className='mt-3 bg-success text-white py-5' color='light' light expand="md">
        <Container>
          <Row>
            <Col>&copy; Tuku!</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Footer