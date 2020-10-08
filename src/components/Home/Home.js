import React from 'react';
import NavBarClient from '../NavBarClient';
import FirstCarousel from './CarouselTop';
import { Container } from 'reactstrap';
import {connect} from 'react-redux'

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return(
      <React.Fragment>
        <NavBarClient {...this.props} />
        <Container>
          <div className='mt-5'>
            <FirstCarousel />
          </div>

        </Container>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({auth: state.auth})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)