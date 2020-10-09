import React from 'react';
import NavBarClient from '../NavBarClient';
import FirstCarousel from './CarouselTop';
import { Container } from 'reactstrap';
import {connect} from 'react-redux';
import carouselImg from '../../Assets/images/carousel2.png'
import arrow from '../../Assets/icons/arrow.svg'


class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return(
      <React.Fragment>
        {/* <NavBarClient /> */}
        <Container>
          <div className='mt-5'>

            <div className="upper-carousel">
              <div className="position-relative">
                  <div className="overflow-auto d-flex">
                    <div className="card position-relative mr-3 ml-3">
                        <a className="card-container" href="#">
                            <img className="rounded" src={carouselImg} alt=""/>
                            <div style={{top: '50%', left: '50%', transform:'translateX(-50%) translateY(-50%)'}} className="w-100 position-absolute text-center">Trends in 2020</div>
                        </a>
                    </div>
                    <div className="card position-relative mr-3 ml-3">
                        <a className="card-container" href="#">
                            <img className="rounded" src={carouselImg} alt=""/>
                            <div style={{top: '50%', left: '50%', transform:'translateX(-50%) translateY(-50%)'}} className="w-100 position-absolute text-center">Trends in 2020</div>
                        </a>
                    </div>
                    <div className="card position-relative mr-3 ml-3">
                        <a className="card-container" href="#">
                            <img className="rounded" src={carouselImg} alt=""/>
                            <div style={{top: '50%', left: '50%', transform:'translateX(-50%) translateY(-50%)'}} className="w-100 position-absolute text-center">Trends in 2020</div>
                        </a>
                    </div>
                    <div className="card position-relative mr-3 ml-3">
                        <a className="card-container" href="#">
                            <img className="rounded" src={carouselImg} alt=""/>
                            <div style={{top: '50%', left: '50%', transform:'translateX(-50%) translateY(-50%)'}} className="w-100 position-absolute text-center">Trends in 2020</div>
                        </a>
                    </div>
                  </div>
      
                  <button className="btn position-absolute rounded-circle prev">
                      <img src={arrow} alt="prev"/>
                  </button>
      
                  <button className="btn position-absolute rounded-circle next">
                      <img src={arrow} alt="next"/>
                  </button>
              </div>

              <div className="dots d-flex justify-align-between">
                  <button className="rounded-circle">&nbsp;</button>
                  <button className="rounded-circle">&nbsp;</button>
                  <button className="rounded-circle">&nbsp;</button>
                  <button className="rounded-circle">&nbsp;</button>
                  <div className="dot-wrapper">
                  </div>
                  <div className="dot-wrapper">
                  </div>
                  <div className="dot-wrapper">
                  </div>
                  <div className="dot-wrapper">
                  </div>
              </div>
            </div>
              
          </div>

        </Container>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({auth: state.auth, profile: state.profile})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)