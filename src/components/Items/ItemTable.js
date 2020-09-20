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
import qs from 'querystring'

class ItemTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchVal: '',
      sortKey: '',
      sortVal:'',
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
      queryPage: {}
    }
  }

  changeIconButton = () => {

  }

  filterDate = (event) => {
    this.setState({
      [event.target.name]: {
        ...{val: [event.target.value]}
      }
    })
  }

  searchAndSort = (event) => {
    let key = event.target.name
    let val = event.target.value
    this.setState({
      [key]: val
    })
  }

  handleSearchSort = async (event) => {
    event.preventDefault()
    let search = { name: this.state.searchVal }
    let sort = { [this.state.sortKey]: this.state.sortVal }
    let queryPage = {
      ...this.state.queryPage,
      ...{search: {
        ...search
      }},
      ...{sort: {
        ...sort
      }},
      ...{dateFrom: {
        ...this.state.dateFrom
      }},
      ...{dateTo: {
        ...this.state.dateTo
      }}
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
      sortKey: '',
      sortVal:'',
      dateFrom: {
        key: 'created_at',
        val: ''
      },
      dateTo: {
        key: 'created_at',
        val: ''
      },
      queryPage: {}
    }) 
  }

  render(){
    const { data } = this.props
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
                    <Row form>
                      <Col xs='6' md='8'>
                        <FormGroup>
                          <Input 
                          type="select"
                          name="sortKey"
                          id="sortKey"
                          onChange={this.searchAndSort}
                          >
                            <option disabled selected hidden>Chose one</option>
                            <option value='price'>Price</option>
                            <option value='name'>Name</option>
                            <option value='created_at'>Date added</option>
                          </Input>
                        </FormGroup>                      
                      </Col>
                      <Col xs='2' md='2'>
                        <FormGroup>
                          <div>
                            <CustomInput 
                            type="radio"
                            id="sortVal"
                            name="sortVal"
                            value={0}
                            onChange={this.searchAndSort}
                            label={<Asc/>}
                            />
                            <CustomInput 
                            type="radio"
                            id="sortVal2"
                            name="sortVal"
                            value={1}
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
                      name="dateFrom"
                      id="filterDateFrom"
                      value={this.state.dateFrom.val}
                      onChange={this.filterDate}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="filterDateTo">To Date</Label>
                    <Input
                      type="date"
                      name="dateTo"
                      id="filterDateTo"
                      value={this.state.dateTo.val}
                      onChange={this.filterDate}
                    />
                    <div className='d-flex justify-content-between'>
                      <Button
                      className='rounded-pill my-3'
                      outline
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
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='2' xs='3'><span className='text-center'>Item ID</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item name</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item price</span></Col>
          <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='4' xs='3'><span className='text-center'>Action</span></Col>
        </Row>
        {Object.keys(data).length && data.map(item => {
          return(
            <Row xs="2">
              <Col md='2' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span className='text-center'>{item.id}</span></Col>
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
        })}
      </Container>
    )
  }
}

export default ItemTable