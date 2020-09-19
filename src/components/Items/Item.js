import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import ModalDetail from './ModalDetail';
import { Container } from 'reactstrap';
import {default as axios} from 'axios';
import qs from 'querystring';
import ItemTable from './ItemTable'


class AdminItem extends React.Component {
  constructor(props){
    super(props)
    console.log('awowowo')
    this.state = {
      data: {},
      modalOpenDetail: false,
      modalOpenNew: false,
      modalOpenUpdate: false,
      modalOpenDelete: false,
      openNavbar: false,
      dataItem: {},
      formUpdate: {
        name: '',
        price: 0,
        category_id: '',
        description: ''
      },
      value: '',
      delUrl: '',
      message: '',
      pageInfo: {
        count: null,
        pages: null,
        limitPerPage: 5,
        currentPage: 1,
        nextLink: '',
        prefLink: ''
      },
      popUpMsg: '',
      searchKey: 'name',
      sortKey: 'id',
      searchValue: '',
      sortValue: 0,
      allCategories: []
    }
  }

  async componentDidMount(){
    await this.getData()
  }

  getData = async () => {
    const queryPage = {
      page: this.state.pageInfo.currentPage,
      limit: this.state.pageInfo.limitPerPage,
      search: { name : this.state.searchValue },
      sort: { id : this.state.sortValue }
    }
    let allCategories = await axios.get('http://localhost:8080/categories?page=1&sort[categories.name]=&limit=-')
    allCategories = allCategories.data.data
    const dataGet = await axios.get(`http://localhost:8080/items/?${qs.stringify({...queryPage})}`)
    const { pageInfo, data } = dataGet.data
    this.setState({
      data,
      pageInfo,
      allCategories
    })
  }

  openModalNew = () => {
    this.setState({
      modalOpenNew: true
    })
  }
  
  openModalDetail = async (url) => {
    url = 'http://localhost:8080/items/'.concat(url)
    let dataItem = await axios.get(url)
    dataItem = dataItem.data.choosenData
    console.log('openModalDetail')
    this.setState({
      modalOpenDetail: true,
      dataItem
    })
  }

  openModalUpdate = async () => {
    this.setState({
      modalOpenUpdate: true,
      formUpdate: {
        name: this.state.dataItem.name,
        price: this.state.dataItem.price,
        description: this.state.dataItem.description,
        category_id: this.state.dataItem.category_id
      }
    })
  }

  openModalDelete = (url) => {
    url = 'http://localhost:8080/items/'.concat(url)
    this.setState({
      modalOpenDelete: true,
      delUrl: url,
    })
  }

  closeModal = async (n) => {
    await this.getData()
    if (n==='del'){
      this.setState({
        modalOpenDelete: false
      })
    } else if (n==='crt'){
      this.setState({
        modalOpenCreate: false
      })
    } else {
      this.setState({
        modalOpenUpdate: false
      })
    }
  }

  render(){
    console.log('render parent')
    const state = this.state
    const { 
      data, 
      dataItem,
      delUrl, 
      formUpdate,
      pageInfo,
      allCategories 
    } = this.state
    return(
      <React.Fragment>
        <NavBar/>
        <Container>
          <h1  className = "my-3">Items on Tuku</h1>
          <ItemTable 
            data={data}
            categories={allCategories}
            openNew = {() => this.openModalNew()}
            openDetail = {id => this.openModalDetail(id)}
            openDelete = {id => this.openModalDelete(id)} 
          />
        </Container>
        <Footer/>
        <ModalCreate 
          modalOpenNew= {this.state.modalOpenNew}
          categories={allCategories}
          modalCloseNew= {async n => this.closeModal(n)}
        />
        <ModalDetail
          dataItem={dataItem}
          modalOpenDetail={this.state.modalOpenDetail} 
          openUpdate = {() => this.openModalUpdate ()}
          modalCloseDetail={() => this.setState({modalOpenDetail: false})}
        />
        <ModalUpdate
          modalOpenUpdate={this.state.modalOpenUpdate}
          formUpdate={formUpdate}
          id={dataItem.id}
          categories={allCategories}
          modalDetail= {async id => this.openModalDetail(id)}
          modalCloseUpdate={async n => this.closeModal(n)}
        />
        <ModalDelete 
          modalOpenDelete= {this.state.modalOpenDelete}
          url= {delUrl}
          modalCloseDelete= { async n => this.closeModal(n) }
        />
      </React.Fragment>
    )
  }
}

export default AdminItem;
