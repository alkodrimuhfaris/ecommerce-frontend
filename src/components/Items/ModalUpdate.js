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

class ModalUpdate extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      url: '',
      formUpdate: {
        name: '',
        price: 0,
        category_id: '',
        description: ''
      },
      popUpMsg: '',
    }
  }
  
  updateItem = (event) => {
    this.setState({
      formUpdate: {
        ...this.state.formUpdate,
        [event.target.name]: event.target.value
      }
    })
  }

  handleUpdate = async (event) => {
    event.preventDefault()
    try {
      let url =`http://localhost:8080/items/`.concat(this.props.id)
      let dataUpdate = {}
      if (Object.keys(this.state.formUpdate).length === Object.values(this.state.formUpdate).length){
        dataUpdate = await axios.put(url, qs.stringify({...this.state.formUpdate}))
      } else {
        dataUpdate = await axios.patch(url, qs.stringify({...this.state.formUpdate}))
      }
      const { message, success } = dataUpdate.data
    
      this.setState({
        popUpMsg: message
      })
  
      if(success) {
        window.confirm(this.state.popUpMsg)
        console.log(this.state.formUpdate)
        this.props.modalCloseUpdate()
        this.props.modalDetail(this.props.id)
      }
    } finally {
    }
  }

  componentDidMount(){
    console.log('component Modal Mounted')
    this.setState({
      formUpdate: this.props.formUpdate 
    })
  }

  componentDidUpdate(prevProps){
    console.log('component Modal Updated')
    if(this.props.modalOpenUpdate !== prevProps.modalOpenUpdate ){
      console.log('componen edited')
      this.setState({
        formUpdate: this.props.formUpdate 
      })
    }
  }

  render(){
    const { categories } = this.props
    return(
      <React.Fragment>
      {/* modal for update */}
      <Modal isOpen={this.props.modalOpenUpdate}>
        <ModalHeader>Update Item</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleUpdate} >
              <FormGroup>
                <Label for="name">Item's name</Label>
                <Input type="name" name="name" id="name" value={this.state.formUpdate.name} onChange={this.updateItem}/>
              </FormGroup>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" id="price" value={this.state.formUpdate.price} onChange={this.updateItem}/>
              </FormGroup>
              <FormGroup>
                <Label for="category_id">Category Id</Label>
                <Input type="select" name="category_id" id="category_id" value={this.state.formUpdate.category_id} onChange={this.updateItem}>
                  {categories.map(item => {
                    return(
                      <option value={item.id}>{item.category}</option>
                    )
                  })}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" value={this.state.formUpdate.description} onChange={this.updateItem}/>
              </FormGroup>
              <div className='d-flex justify-content-center'>
                <Button color="success" type="submit" className = "rounded-pill">Save</Button>
              </div>
            </Form>
          </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => this.props.modalCloseUpdate('updt')} className = "rounded-pill">Close</Button>
        </ModalFooter>
      </Modal>
    
    </React.Fragment>
    )
  }
}

export default ModalUpdate