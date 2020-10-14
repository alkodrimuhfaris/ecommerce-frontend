import React, {useEffect, useState} from 'react'
import NavBarClient from '../NavBarClient'
import {useHistory, useParams, Link} from 'react-router-dom'
import {Row, Col, Container, Button, Input, Card, CardImg, CardSubtitle} from 'reactstrap'
import {useSelector, useDispatch} from 'react-redux'
import itemActions from '../../redux/actions/items'
import StarRating from '../StarRating'
import cartActions from '../../redux/actions/cart'
import currencyFormat from '../../helpers/currencyFormat'
import { FaStar } from 'react-icons/fa'
import photoDefault from '../../Assets/images/TukuIcon.png'

export default function ItemDetails() {
  let {id} = useParams()
  const product = useSelector(state=>state.items.detailItem)
  const productsNew = useSelector(state=>state.items.dataNewItems)
  const token = useSelector(state=>state.auth.token)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(()=>{
    dispatch(itemActions.getNewItems('1', '15'))
  },[])

  useEffect(()=>{
    console.log('INI PRODUCT!')
    console.log(product)
    dispatch(itemActions.getDetailItem(id))
  },[dispatch, id])
  
  const [picShow, setPicShow] = useState(process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_1)
  const [selectSize, setSelectSize] = useState(null)
  const [selectQty, setSelectQty] = useState(1)

  const selectedPict = (link, e) => {
    e.preventDefault()
    setPicShow(link)
  }

  useEffect(() => 
    setPicShow(process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_1), [product]
  )

  const colorDetail = useSelector(state=>state.items.detailColorItem)

  const imgArr = [
    product.product_image_1,
    product.product_image_2,
    product.product_image_3,
    product.product_image_4,
  ]

  const [ratingArr] = Object.keys(product).length ? product.rating : [0]
  const {productDetails} = Object.keys(product).length ? product : {productDetails:0}
  const [colorForDetail] = Object.keys(colorDetail).length ? colorDetail : [{stock:0}]
  const [colorSelected, setColorSelected] = useState(null)
  useEffect(()=>{
    console.log('INI DETAIL PRODUCT ID TERTENTU!')
    console.log(colorDetail)
    colorSelected && dispatch(itemActions.getDetailColorItem(colorSelected))
  },[dispatch, colorSelected])

  const pushTo = (path, e) => {
    e.preventDefault()
    history.push(path)
  }

  const cart = useSelector(state=>state.cart)
  const addBagHandler = e =>{
    e.preventDefault()
    dispatch(cartActions.postCart(token, selectQty, colorSelected))
  }

  useEffect(()=> {
    (cart.isAdded || cart.isError) && alert(cart.alertMsg)
  },[cart.isAdded, cart.isError])

  const imgProduct = product => {
    return (
      // process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_1
      // || process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_2
      // || process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_3
      // || process.env.REACT_APP_URL_BACKEND+'/'+product.product_image_4
      // || 
      photoDefault
    )
  }

  const titleStyle = {
    overflow: 'hidden',
    width:'100%',
    lineHeight: '1.1em',
    height: '2.2em',
    marginBottom: '1em',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    fontWeight: 'bold'
  }

  const storeStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '0.75em',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    margin: '0.5em 0 0.5em 0'
  }

  return (
    <div>
      <NavBarClient />
      <Container>
        <Row>
          <Col xs='12' sm='4' md='4'>
            <Row>
              <Col xs='12' className='mb-2'>
                <img src={picShow} alt='pic showed' className='rounded img-fluid'/>
              </Col>
              {imgArr.length && imgArr.map(link =>{
                link =  process.env.REACT_APP_URL_BACKEND+'/'+link
                  return (
                    <Col className='rounded' onClick={e => selectedPict(link,e)}>
                      <img src={link} alt='pic selector' className='rounded img-fluid w-100' />
                    </Col>
                  )
                }
              )}
            </Row>
          </Col>
          <Col xs='12' sm='8' md='8'>
            <Row>
              <Col xs='12' className='h3'>
                {product.name}
              </Col>
            </Row>
            <Row>
              <Col xs='12' className='text-muted'>
                {product.store_name}
              </Col>
            </Row>
            <Row className='my-2'>
              <Col xs='12' className='d-flex'>
                <span><StarRating rating={ratingArr.ratingAvg}/></span><span className='ml-1 text-muted'>({ratingArr.ratingCount || 0})</span>
              </Col>
            </Row>
            <Row className='my-2'>
              <Col xs='12'>Price</Col>
              <Col xs='12' className='text-success h5'>{currencyFormat(product.price)}</Col>
            </Row>
            <Row className='my-3'>
              <Col xs='12' className='h6'>Color</Col>
              <Col xs='12' className='d-flex'>
                {productDetails.length && productDetails.map(details => 
                  { let border = (colorSelected === details.id) ? '1px solid red' : 'none'
                  return(
                    <div 
                      style={{width:'2em', 
                              height:'2em', 
                              border:border}}
                      className='mr-2 position-relative rounded-circle'>
                      <Button 
                        disabled={details.stock <= 0} 
                        style={{backgroundColor: details.hex,
                                width:'80%',
                                height:'80%',
                                top:'50%',
                                left:'50%',
                                transform:'translate(-50%, -50%)'}}
                        className='rounded-circle position-absolute border-0' 
                        onClick={() => setColorSelected(details.id)} 
                        active={colorSelected === details.id}
                      >
                      &nbsp;
                      </Button>
                    </div>
                  )}
                )}
              </Col>
            </Row>
            <Row>
              <Col xs='6' md='4' lg='3'>
                <div><strong>Size</strong></div>
                <div className='d-flex'>
                  <Button disabled={selectSize <= 0} color='secondary' className='rounded-circle'
                    onClick={() => setSelectSize(selectSize-1)}>&#8722;</Button>
                  <div className='text-center' style={{width:'4em'}}>{selectSize}</div>
                  <Button
                    color='light'
                    className='rounded-circle'
                    onClick={() => setSelectSize(selectSize+1)}>
                  &#43;
                  </Button>
                </div>
              </Col>

              <Col xs='6' md='4' lg='3'>
                <div><strong>Quantity</strong></div>
                <div className='d-flex'>
                  <Button color='secondary' disabled={selectQty <= 0} className='rounded-circle'
                    onClick={() => setSelectQty(prevSelectQty => prevSelectQty-1)}>&#8722;</Button>
                  <Input className='text-center border-0' style={{border:'none'}} type='number' name='quantity' value={selectQty}
                    onChange={e => setSelectQty(e.target.value)} style={{width:'4em'}}/>
                  <Button color='light' disabled={colorForDetail.stock <= selectQty} className='rounded-circle'
                   onClick={() => setSelectQty(prevSelectQty => prevSelectQty+1)}>&#43;</Button>
                </div>
              </Col>
            </Row> 
            <Row className='my-3'>
              <Col xs='6' md='3' className='my-1'>
                <Button outline color='dark' className='w-100 rounded-pill' style={{fontSize:'0.75em'}} onClick={e => pushTo('/chat', e)}>Chat</Button>
              </Col>
              <Col xs='6' md='3' className='my-1'>
                <Button outline color='dark' className='w-100 rounded-pill' style={{fontSize:'0.75em'}} onClick={e => addBagHandler(e)}>Add bag</Button>
              </Col>
              <Col xs='12' md='6'>
                <Button color='success' className='w-100 rounded-pill' style={{fontSize:'0.75em'}} onClick={e => pushTo('/checkout', e)}>Buy Now</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className='h4 my-4'>Informasi Produk</div>
        <div className='h5 mt-4'>Condition</div>
        <div className='h5 text-success my-2'>{product.item_condition}</div>

        <div className='h5 mt-4'>Description</div>
        <article className='text-muted my-2'>
          {product.description}
        </article>

        <div className='h5 mt-4'>Product Review</div>
        <Row>
          <Col xs='5' md='3' lg='3'>
            <div>
              <span className='display-4'>{Math.round(ratingArr.ratingAvg*10)/10}</span><span>/5</span>
            </div>
            <div><StarRating rating={ratingArr.ratingAvg}/></div>
          </Col>
          <Col xs='7' md='4' lg='4'>
              {
              ratingArr && ratingArr.starCount.map((starCount, i) => {
                let width = `${starCount*100/ratingArr.ratingCount}%`
                i=5-i
                console.log(i)
                return(
                <Row>
                  <Col xs='1'><FaStar style={{color:'#f8ce0b'}}/></Col>
                  <Col xs='1' className='text-muted'>{i}</Col>
                  <Col xs='7'>
                    <div className='position-relative' style={{width:'100%', height:'100%'}}>
                      <div className='position-absolute' className='bg-success' style={{width:width, height:'20%', left:0, transform:'translateY(180%)'}}></div>
                    </div>
                  </Col>
                  <Col xs='1' className='px-0'>{starCount}</Col>
                </Row>
                )
              })}
          </Col>
        </Row>

        <div className='w-100 border-bottom my-3'></div>

        <div className='h3'>You can also like this</div>
          <div className='text-muted'>You've never seen it before</div>

          <Row className='justify-content-md-center mt-3 mb-5'>
            {productsNew.length && 
            productsNew.map(product=>{
              return (
                <Col xs='5' sm='4' md='3' lg='2'  className='m-2'>
                  <Link to={`/product/${product.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <Card className='shadoq'>
                      <CardImg top width='100%' src={imgProduct(product)} alt='Product image'/>
                      <Container className='my-3'>
                        <div style={titleStyle}>{product.name}</div>
                        <CardSubtitle><strong className='text-success'>{currencyFormat(product.price)}</strong></CardSubtitle>
                        <CardSubtitle style={storeStyle} className='text-muted'>{product.store_name || 'Tuku Store'}</CardSubtitle>
                        <CardSubtitle className='d-flex'><span><StarRating rating={product.rating}/></span><span className='ml-1 text-muted'>({product.ratingCount || 0})</span></CardSubtitle>
                      </Container>
                    </Card> 
                  </Link>
                </Col>
              )
            })
            }
          </Row>

        

      </Container>
    </div>
  )
}
