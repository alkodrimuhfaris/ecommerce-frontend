import React from 'react';
import {
  Button,
  Row,
  Container,
  Col,
  UncontrolledCollapse,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import {ReactComponent as SearchLogo} from '../../Assets/icons/searchIcon.svg'
import {ReactComponent as Filter} from '../../Assets/icons/filter.svg'
import {ReactComponent as Asc} from '../../Assets/icons/sortAsc.svg'
import {ReactComponent as Desc} from '../../Assets/icons/sortDsc.svg'

class ItemTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchVal: '',
      sortKey: 'created_at',
      sortVal:0,
      sortValBtn:null,
      dateFrom: {
        key: 'created_at',
        val: ''
      },
      dateTo: {
        key: 'created_at',
        val: ''
      },
      dateFromVal: '',
      dateToVal: '',
      queryPage: {},
      applyBtn: true,
      newestBtn: false,
      oldestBtn: true
    }
  }

  filterDate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      })
  }

  handleSortBtn = (n, event) => {
    event.preventDefault()
    if (n===0){
      this.setState({
        sortKey: 'created_at',
        sortVal: n,
        newestBtn: false,
        oldestBtn: true,
        sortValBtn: null
      })
    } else {
      this.setState({
        sortKey: 'created_at',
        sortVal: n,
        newestBtn: true,
        oldestBtn: false,
        sortValBtn: null
      })
    }
    
  }

  searchAndSort = (event) => {
    let key = event.target.name
    let val = event.target.value
    this.setState({
      [key]: val,
    })
    if (event.target.name === 'sortValBtn') {
      this.setState({
        newestBtn: true,
        oldestBtn: true,
      })
    }
  }

  handleSearchSort = async (event) => {
    event.preventDefault()
    let search = {search: { name: this.state.searchVal }}
    let sort = {}
    if (!this.state.sortValBtn){
      sort = {sort: { [this.state.sortKey]: this.state.sortVal }}
    } else {
      sort = {sort: { [this.state.sortKey]: this.state.sortValBtn }}
    }
    let dateFrom = {dateFrom: {
      ...this.state.dateFrom,
      val: this.state.dateFromVal.split('-').join('')}}
    let dateTo = {dateTo: {
      ...this.state.dateTo,
      val: this.state.dateToVal.split('-').join('')}}
    let queryPage = {
      ...this.props.queryPage,
      ...dateFrom,
      ...dateTo,
      ...search,
      ...sort
    }
    await this.props.applyChange(queryPage)
    this.setState({
      queryPage
    })
  }

  handleToDefault = async (event) => {
    event.preventDefault()
    await this.props.applyChange(this.props.queryOld)
    this.setState({
      searchVal: '',
      sortKey: 'price',
      sortValBtn:null,
      sortVal:0,
      dateFrom: {
        key: 'created_at',
        val: ''
      },
      dateTo: {
        key: 'created_at',
        val: ''
      },
      dateFromVal: '',
      dateToVal: '',
      queryPage: {},
      applyBtn: true,
      newestBtn: false,
      oldestBtn: true
    }) 
  }

  render(){
    const { data, pageInfo } = this.props
    let num = ((pageInfo.currentPage-1)*pageInfo.dataPerPage)
    return(
      <Container>
        <Row xs="2">
          <Col xs='3'>
            <Button onClick={() => this.props.openNew()} color="success" className = "my-3 rounded-pill" >+ Add new</Button>
          </Col>
          <Col xs='9'>
            <div class='d-flex justify-content-between my-3'>
              <Form className='w-75' onSubmit={this.handleSearchSort}>
                <FormGroup>
                  <InputGroup>
                    <Input
                    type='name' 
                    name='searchVal'
                    id='searchVal'
                    value={this.state.searchVal}
                    onChange={this.searchAndSort} />
                    <InputGroupAddon addonType="append"><Button>
                      <SearchLogo />
                    </Button></InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Form>

              <div>
                <Button
                className='ml-2'
                outline
                color="success"
                id="toggler"
                style={{ marginBottom: '1rem' }}>
                  <Filter />
                </Button>
                <UncontrolledCollapse toggler="#toggler">
                  <Form onSubmit={this.handleSearchSort}>
                    <Label for="sortKey">Sort by</Label>
                    <Row>
                      <Col xs='12' md='6'>
                        <Button
                          className='rounded-pill my-3'
                          outline={this.state.newestBtn}
                          color='success'
                          onClick={e => this.handleSortBtn(0, e)}>
                            Newest
                        </Button>
                      </Col>
                      <Col xs='12' md='6'>
                        <Button
                          className='rounded-pill my-3'
                          outline={this.state.oldestBtn}
                          color='success'
                          onClick={e => this.handleSortBtn(1, e)}>
                            Oldest
                        </Button>
                      </Col>
                    </Row>
                    <Row form>
                      <Col xs='6' md='8'>
                        <FormGroup>
                          <Input 
                          type="select"
                          name="sortKey"
                          id="sortKey"
                          onChange={this.searchAndSort}
                          >
                            <option value='created_at' disabled selected>Choose one</option>
                            <option value='price'>Price</option>
                            <option value='name'>Name</option>
                          </Input>
                        </FormGroup>                      
                      </Col>
                      <Col xs='2' md='2'>
                        <FormGroup>
                          <div>
                            <CustomInput 
                            type="radio"
                            id="sortVal"
                            name="sortValBtn"
                            value={1}
                            onChange={this.searchAndSort}
                            label={<Asc/>}
                            />
                            <CustomInput 
                            type="radio"
                            id="sortVal2"
                            name="sortValBtn"
                            value={0}
                            onChange={this.searchAndSort}
                            label={<Desc/>}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  <FormGroup>
                    <Label for="filterDateFrom">From Date</Label>
                    <Input
                      type="date"
                      name="dateFromVal"
                      id="filterDateFrom"
                      value={this.state.dateFromVal}
                      onChange={this.filterDate}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="filterDateTo">To Date</Label>
                    <Input
                      type="date"
                      name="dateToVal"
                      id="filterDateTo"
                      value={this.state.dateToVal}
                      onChange={this.filterDate}
                    />
                    <div className='d-flex justify-content-between'>
                      <Button
                      className='rounded-pill my-3'
                      outline={this.state.applyBtn}
                      onClick={() => this.setState({
                        applyBtn: !this.state.applyBtn
                      })}
                      color='success'
                      type='submit'>
                        Apply
                      </Button>

                      <Button
                        className='rounded-pill my-3'
                        outline
                        color='danger'
                        onClick={this.handleToDefault}>
                          Abort All
                      </Button>
                    </div>

                  </FormGroup>
                  </Form>
                </UncontrolledCollapse>
              </div>
            </div>
          </Col>
        </Row>
        <Row xs="2">
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='2' xs='3'><span className='text-center'>No.</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item name</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item price</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='4' xs='3'><span className='text-center'>Action</span></Col>
        </Row>
        {
        (Object.keys(data).length) &&
        ((pageInfo.count!==0) 
        ?
        (data.map(item => {
          num++
          return(
            <Row xs="2">
              <Col md='2' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span className='text-center'>{num}</span></Col>
              <Col md='3' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span className='text-center'>{item.name}</span></Col>
              <Col md='3' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span className='text-center'>{item.price}</span></Col>
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
        }))
        :
        (
          <Container className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'>
            <span className='text-center' color='danger'>{pageInfo.message}</span>
          </Container>
        )
        )
        
        }
      </Container>
    )
  }
}

export default ItemTable