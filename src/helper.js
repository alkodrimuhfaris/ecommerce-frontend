import React from 'react';
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {default as axios} from 'axios';
import qs from 'querystring';

class ModalUpdateForm extends React.Component{
   updateItem = (event) => {
    let key = event.target.name
    let val = event.target.value
    this.setState({
      formUpdate: {
        [key]: val
      }
    })
  }

  handleUpdate = async (event) => {
    event.preventDefault()
    let url =`http://localhost:8080/items/`.concat(this.props.id)
    let dataUpdate = {}
    if (Object.keys(this.props.formUpdate).length === Object.values(this.props.formUpdate).length){
      dataUpdate = await axios.put(url, qs.stringify({...this.props.formUpdate}))
    } else {
      dataUpdate = await axios.patch(url, qs.stringify({...this.props.formUpdate}))
    }
    const { message, success } = dataUpdate.data
  
    this.setState({
      popUpMsg: message
    })
    if(success) {
      window.confirm(this.state.popUpMsg)
      this.props.modalCloseUpdate()
    }
  }

  render(){
    return(
      <React.Fragment>
        <Form onSubmit={this.handleUpdate} >
          <FormGroup>
            <Label for="name">Item's name</Label>
            <Input type="name" name="name" id="name" value={formUpdate.name} onChange={this.updateItem}/>
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input type="number" name="price" id="price" value={formUpdate.price} onChange={this.updateItem}/>
          </FormGroup>
          <FormGroup>
            <Label for="category_id">Category Id</Label>
            <Input type="number" name="category_id" id="category_id" value={formUpdate.category_id} onChange={this.updateItem}/>
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description" value={formUpdate.description} onChange={this.updateItem}/>
          </FormGroup>
          <div className='d-flex justify-content-center'>
            <Button color="success" type="submit" className = "rounded-pill">Save</Button>
          </div>
        </Form>
      </React.Fragment>
    )
  }
}