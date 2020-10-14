import React, {useEffect, useState} from 'react'
import NavBarClient from '../NavBarClient'
import {useHistory, useParams, Link} from 'react-router-dom'
import {Row, Col, Container, Button, Input, Card, CardTitle, CardImg, CardSubtitle} from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import cartActions from '../../redux/actions/cart'
import photoDefault from '../../Assets/images/TukuIcon.png'

export default function Cart() {
  const token = useSelector(state => state.auth.token)
  const dataCart = useSelector(state => state.cart.dataCart)
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState([])
  const [price, setPrice] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  
  useEffect(()=>{
    dispatch(cartActions.getCart(token))
  },[])

  useEffect(()=>{
    dataCart.length && setQuantity(dataCart.map(item => {item = item.quantity; return(item)}))
    console.log(quantity)
  },[dataCart])

  useEffect(()=>{
    dataCart.length && setPrice(dataCart.map((item,i) => {item = quantity[i]*item.price; return(item)}))
    console.log(price)
  },[dataCart, quantity])

  const increaseQty = i => {
    setQuantity(prevQty => {
      console.log(prevQty)
      return prevQty.map((item, index) => {
        item = (index === i) ? item+1 : item
        return(item)
      })
    })
    console.log(quantity[i])
    console.log(quantity)
  }

  const decreaseQty = i => {
    setQuantity(prevQty => {
      console.log(prevQty)
      return prevQty.map((item, index) => {
        item = (index === i) ? item-1 : item
        return(item)
      })
    })
    console.log(quantity[i])
    console.log(quantity)
  }

  const handleChangeQty = (i, e) => {
    let val = e.target.value
    if (e.target.value <= 0) {
      alert('Cannot add zero and negative value!')
      val = 1
    }
    setQuantity(prevQty => {
      return prevQty.map((item, index) => {
        item = (index === i) ? val : item
        return(item)
      })
    })
  }
  

  return (
    <>
      <NavBarClient />
      <Container>
        <div className='h3 my-3'>My Bag</div>
        <Row>
          <Col xs='12' md='7'>
            <Card className='shadow-lg my-3'>
              This is card for cart
            </Card>
            {dataCart.length && dataCart.map((item, i)=> {
              return(
                <Card className='shadow-lg my-3'>
                  <Row>
                    <Col xs='1'>
                    </Col>
                    <Col xs='2'>
                      <div className='position-relative rounded overflow-hidden' style={{width:'2em', height:'2em'}}>
                        <img src={item.cartImg ? process.env.REACT_APP_URL_BACKEND+'/'+item.cartImg : photoDefault}
                          className='img-fluid position-absolute' style={{top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}
                        />
                      </div>  
                    </Col>
                    <Col xs='4'>
                      {item.product_name}
                    </Col>
                    <Col xs='3' className='d-flex'>
                      <Button color='secondary' disabled={quantity[i] <= 1} className='rounded-circle'
                        onClick={() => decreaseQty(i)}>&#8722;</Button>
                      <Input className='text-center border-0' style={{border:'none'}} type='number' name='quantity' value={quantity[i]}
                        onChange={e => handleChangeQty(i, e)} style={{width:'4em'}}/>
                      {/* <div>{quantity[i]}</div> */}
                      <Button color='light' className='rounded-circle'
                        onClick={() => increaseQty(i)}>&#43;</Button>
                    </Col>
                    <Col xs='2'>
                      {price[i]}
                    </Col>
                  </Row>
                </Card>
              )
            })
            }
          </Col>
          <Col xs='12' md='5' className='my-3'>
            <Card className='shadow-lg'>
              <Container className='my-2'>
                <div>Shopping summary</div>
                <div className='d-flex justify-content-between'>
                  <div>Total Price</div>
                  <div>{totalPrice}</div>
                </div>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
