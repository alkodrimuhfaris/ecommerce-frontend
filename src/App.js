import React from 'react';
import logo from './logo.svg';
import {default as axios} from 'axios';
import {
  Jumbotron,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

class Series extends React.Component{
  constructor(props){
    super(props)
    console.log('awowowo')
    this.state = {
      data: {},
      modalOpenDetail: false,
      modalOpenNew: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      addNewItem: 'abwabwa',
      openNavbar: false,
      dataItem: {},
      value: '',
      url: '',
      message: '',
      formUpdate: {}
    }
  }


  async componentDidMount(){
    let data = await axios.get('http://localhost:8080/items/')
    data = data.data
    this.setState({
      data,
      message:
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className='text-center'>Are you sure want to delete?</span>
          </div>
          <div className='d-flex justify-content-center'>
            <Button color="danger" onClick={ () => this.deleteItem(this.state.url)} className = "rounded-pill">DELETE</Button>
          </div>
        </div>
    })
  }

  openModalDetail = async (url) => {
    const detailItem = await axios.get(url)
    const dataItem = detailItem.data.choosenData
    const {
      id,
      name,
      price,
      category_id,
      description,
      created_at,
      updated_at
    } = dataItem
    console.log('openModalDetail')
    console.log(new Date(created_at))
    this.setState({
      modalOpenDetail: true,
      id: id,
      name: name,
      price: price,
      categoryId: category_id,
      description: description,
      createdAt: new Date(created_at),
      updatedAt: new Date(updated_at),
      dataItem: dataItem,
    })
  }

  closeModalDetail = () => {
    this.setState({modalOpenDetail: false})
  }

  openModalNew = () => {
    this.setState({modalOpenNew: true})
  }

  closeModalNew = () => {
    this.setState({
      modalOpenNew: false
    })
  }

  openModalUpdate = (dataItem) => {
    console.log(dataItem.id)
    this.setState({modalOpenUpdate: true})
  }

  closeModalUpdate = () => {
    this.setState({modalOpenUpdate: false})
  }

  openModalDelete = (url) => {
    console.log(this.state.url)
    this.setState({
      url: url,
      modalOpenDelete: true
    })
  }

  closeModalDelete = () => {
    this.setState({
      modalOpenDelete: false,
      message:
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className='text-center'>Are you sure want to delete?</span>
          </div>
          <div className='d-flex justify-content-center'>
            <Button color="danger" onClick={ () => this.deleteItem(this.state.url)} className = "rounded-pill">DELETE</Button>
          </div>
        </div>
    })
  }

  // FUNCTION FOR AXIOS

  // DELETE
  deleteItem = async (url) => {
    const del = await axios.delete(url)
    let data = await axios.get('http://localhost:8080/items/')
    data = data.data
    const message = del.data.message
    this.setState({
      message: 
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <span className='text-center'>{message}</span>
          </div>
        </div>,
      data
    })
  }

  updateItem = event => {
      event.preventDefault();
      const data = new FormData(event.target);
      console.log(data)

      this.setState({
        formUpdate: data
      })

      // fetch('/api/form-submit-url', {
      //   method: 'POST',
      //   body: data,
      // });
    }
  

  
  render(){
    console.log('render parent')
    const { data, dataItem, formUpdate } = this.state
    console.log(data.message)
    console.log('ini form update :'+formUpdate)
    console.log(dataItem.id)
    console.log(this.state.url)
    return(
      <React.Fragment>
        <Navbar className='bg-success text-white' dark expand="md">
          <Container>
            <NavbarBrand>Tuku-Admin</NavbarBrand>
            <NavbarToggler onClick={ () => this.setState({openNavbar: !this.state.openNavbar})} />
            <Collapse isOpen={this.state.openNavbar} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href='#'>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#'>About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href='#'>Contact Us</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Container>
          <div>
            <h1  className = "my-3">Items on Tuku</h1>
            <Container>
              <Button onClick={this.openModalNew} color="success" className = "my-3 rounded-pill" >+ Add new</Button>
              <Row xs="2">
                <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='2' xs='3'><span className='text-center'>Item ID</span></Col>
                <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item name</span></Col>
                <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='3' xs='3'><span className='text-center'>Item price</span></Col>
                <Col className='d-flex align-items-center justify-content-center border px-2 py-3' md='4' xs='3'><span className='text-center'>Action</span></Col>
              </Row>
            </Container>
            {Object.keys(data).length && data.data.map(item => {
              return(
                <Container>
                  <Row xs="2">
                    <Col md='2' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span>{item.id}</span></Col>
                    <Col md='3' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span>{item.name}</span></Col>
                    <Col md='3' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'><span>{item.price}</span></Col>
                    <Col md='4' xs='3' className='border d-flex align-items-center justify-content-center px-2 py-3'>
                      <Row className='row justify-content-around'>
                        <div className='col-md-4 d-flex align-items-center justify-content-center my-1' xs='12'>
                          <Button onClick={() => this.openModalDetail(`http://localhost:8080/items/${item.id}`)} color="success" className = "rounded-pill" >Detail</Button>
                        </div>
                        <div className='col-md-4 d-flex align-items-center justify-content-center my-1' xs='12'>
                          <Button onClick={ () => this.openModalDelete(`http://localhost:8080/items/${item.id}`)} color="danger" className = "rounded-pill">Delete</Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              )
            })}
          </div>
        </Container>
        <div className='mt-3 bg-success text-white py-5'>
          <Container color='light' light expand="md">
            <Row>
              <Col>&copy; Tuku!</Col>
            </Row>
          </Container>
        </div>

        {/* modal for display */}
        <Modal isOpen={this.state.modalOpenDetail}>
          <ModalHeader>Details</ModalHeader>
          <ModalBody>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Item ID</Col>
              <Col xs={8} className='ml-1'>{`${this.state.id}`}</Col>
            </Row>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Item Name</Col>
              <Col xs={8} className='ml-1'>{`${this.state.name}`}</Col>
            </Row>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Categry ID</Col>
              <Col xs={8} className='ml-1'>{`${this.state.categoryId}`}</Col>
            </Row>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Item Price</Col>
              <Col xs={8} className='ml-1'>{`${this.state.price}`}</Col>
            </Row>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Item Description</Col>
              <Col xs={8} className='ml-1'>{`${this.state.description}`}</Col>
            </Row>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Created at</Col>
              <Col xs={8} className='ml-1'>{`${this.state.createdAt}`}</Col>
            </Row>
            <Row className = 'my-3'>
              <Col xs={3} className='mr-1'>Updated at </Col>
              <Col xs={8} className='ml-1'>{`${this.state.updatedAt}`}</Col>
            </Row>
            <Button color="success" onClick={ () => this.openModalUpdate({dataItem})} className = "rounded-pill">Update</Button>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.closeModalDetail} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>

        {/* modal for update */}
        <Modal isOpen={this.state.modalOpenUpdate}>
          <ModalHeader>Update Item</ModalHeader>
          <ModalBody>
          <Form>
              <FormGroup>
                  <Label for="itemName">Item's name</Label>
                  <Input type="name" name="itemName" id="itemName"/>
                </FormGroup>
                <FormGroup>
                  <Label for="itemPrice">Price</Label>
                  <Input type="number" name="itemPrice" id="itemPrice"/>
                </FormGroup>
                <FormGroup>
                  <Label for="categoryId">Category Id</Label>
                  <Input type="select" name="categoryId" id="categoryId">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="itemDescription">Description</Label>
                  <Input type="textarea" name="itemDescription" id="itemDescription" />
                </FormGroup>
                <div className='d-flex justify-content-center'>
                  <Button color="success" type="submit" onSubmit = {this.updateItem} className = "rounded-pill">Save</Button>
                </div>
              </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.closeModalUpdate} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>
        
        {/* modal for post new */}
        <Modal isOpen={this.state.modalOpenNew}>
          <ModalHeader>Add New</ModalHeader>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.closeModalNew} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>

        {/* modal for delete */}
        <Modal isOpen={this.state.modalOpenDelete}>
          <ModalHeader>Delete Item</ModalHeader>
          <ModalBody>
            {this.state.message}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.closeModalDelete} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Series;
