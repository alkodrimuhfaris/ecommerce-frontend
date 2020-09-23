import React from 'react';
import NavBarClient from '../NavBarClient';
import FirstCarousel from './carousel1';
import { Container } from 'reactstrap'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return(
      <React.Fragment>
        <NavBarClient />
        <Container>
          <div className='mt-5'>
            <FirstCarousel />
          </div>

        </Container>
      </React.Fragment>
    )
  }
}

export default Home