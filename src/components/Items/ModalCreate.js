import React from 'react';
import {default as axios} from 'axios';
import {
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
} from 'reactstrap';
import qs from 'querystring';


class ModalCreate extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      formAdd: {
        name: '',
        price: 0,
        category_id: 'none',
        description: ''
      },
      popUpMsg: ''
    }
  }

  addItem = (event) => {
    this.setState({
      formAdd: {
        ...this.state.formAdd,
        [event.target.name]: event.target.value
      }
    })
  }

  handleAdd = async (event) => {
    event.preventDefault()
    const dataUpdate = await axios.post('http://localhost:8080/items/', qs.stringify({...this.state.formAdd}))
    const { message, success } = dataUpdate.data
    console.log(dataUpdate.data)

    this.setState({
      popUpMsg: message
    })
    
    if(!success){ 
      console.log(message)
      window.alert(message)
    } else {
      window.alert(this.state.popUpMsg)
      this.props.modalCloseNew()
    }
  }

  render(){
    const { categories } = this.props
    return(
      <React.Fragment>
        {/* modal for post new */}
        <Modal isOpen={this.props.modalOpenNew}>
          <ModalHeader>Add New Item</ModalHeader>
            <ModalBody>
              <Form onSubmit = {this.handleAdd} >
                <FormGroup>
                  <Label for="name">Item's name</Label>
                  <Input type="name" name="name" id="name" value={this.state.formAdd.name} onChange={this.addItem}/>
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input type="number" name="price" id="price" value={this.state.formAdd.price} onChange={this.addItem}/>
                </FormGroup>
                <FormGroup>
                  <Label for="category_id">Category Id</Label>
                  <Input type="select" name="category_id" id="category_id" value={this.state.formAdd.category_id} onChange={this.addItem}>
                    <option value='none' selected disabled hidden>Select One of This</option>
                    {categories.map(item => {
                      return(
                        <option value={item.id}>{item.category}</option>
                      )
                    })}
                </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="description" value={this.state.formAdd.description} onChange={this.addItem}/>
                </FormGroup>
                <div className='d-flex justify-content-center'>
                  <Button color="success" type="submit" className = "rounded-pill">Submit</Button>
                </div>
              </Form>
            </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.props.modalCloseNew()} className = "rounded-pill">Close</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    
    )
  }
}

export default ModalCreate
