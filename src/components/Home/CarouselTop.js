import React from 'react'
import ItemsCarousel from 'react-items-carousel'
import carousel2 from '../../Assets/images/carousel2.png'
import carousel3 from '../../Assets/images/carousel3.png'

class FirstCarousel extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activeItemIndex: 0,
      chevronWidth: 40
    }
  }
  
  imageCarousel = () => {
    let images=[
      <img src={carousel2} className="img-fluid rounded" alt="carousel1" />,
      <img src={carousel3} className="img-fluid rounded" alt="carousel2" />,
      <img src={carousel2} className="img-fluid rounded" alt="carousel3" />,
      <img src={carousel3} className="img-fluid rounded" alt="carousel4" />
    ]

    const style = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    images=images.map(item => {
      return(
        <div className="card position-relative mx-3">
            <a className="card-container" href="#">
                {item}
                <div 
                className="txt-card w-100 position-absolute text-center"
                style={style}
                >Trends in 2020</div>
            </a>
        </div>
      )
    })
    return(images)
  }
   
  render(){
    const {activeItemIndex, chevronWidth} = this.state
    return(
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        <ItemsCarousel
          requestToChangeActive={(activeItemIndex) => this.setState({ activeItemIndex })}
          activeItemIndex={activeItemIndex}
          numberOfCards={2}
          gutter={20}
          leftChevron={<button>{'<'}</button>}
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={chevronWidth}
        >
          {this.imageCarousel}
        </ItemsCarousel>
      </div>
    )
  }
}

export default FirstCarousel