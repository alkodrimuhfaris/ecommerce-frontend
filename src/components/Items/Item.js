import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalUpdate from './ModalUpdate';
import ModalDetail from './ModalDetail';
import { Container } from 'reactstrap';
import {default as axios} from 'axios';
import Pagination from '../Pagination';
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
      queryPage: {
        page: 1,
        limit: 5,
        search: {
          name: ''
        },
        sort: {
          id: 0
        }
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

  getData = async (url=`http://localhost:8080/items/?${qs.stringify({...this.state.queryPage})}`) => {
    let allCategories = await axios.get('http://localhost:8080/categories?page=1&sort[categories.name]=&limit=-')
    allCategories = allCategories.data.data
    const dataGet = await axios.get(url)
    const { pageInfo, data } = dataGet.data
    console.log(pageInfo)
    this.setState({
      data,
      pageInfo,
      allCategories
    })
  }

   
  openModalDetailDelete = async (url, n) => {
    url = 'http://localhost:8080/items/'.concat(url)
    let dataItem = await axios.get(url)
    dataItem = dataItem.data.choosenData
    console.log('openModalDetail')
    if (n) {
      this.setState({
        modalOpenDelete: true,
        delUrl: url,
        dataItem
      })
    } else {
      this.setState({
        modalOpenDetail: true,
        delUrl: url,
        dataItem
      })
    }
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

  closeModal = async (n) => {
    await this.getData()
    if (n==='del'){
      this.setState({
        modalOpenDelete: false
      })
    } else if (n==='crt'){
      this.setState({
        modalOpenNew: false
      })
    } else if (n==='updt') {
      this.setState({
        modalOpenUpdate: false
      })
    } else {
      this.setState({
        modalOpenDetail: false
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
    console.log(pageInfo)
    return(
      <React.Fragment>
        <NavBar/>
        <Container className='my-3'>
          <h1  className = "my-3">Items on Tuku</h1>
          <ItemTable 
            data={data}
            categories={allCategories}
            openNew = {() => this.setState({modalOpenNew: true})}
            openDetail = {(id,n) => this.openModalDetailDelete(id,n)}
            openDelete = {(id,n) => this.openModalDetailDelete(id,n)} 
          />
          <Pagination
            pageInfo = {this.state.pageInfo}
            queryPage = {this.state.queryPage}
            changePage = {async url => this.getData(url)}
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
          modalCloseDetail={async n => this.closeModal(n)}
          openDelete = {(id,n) => this.openModalDetailDelete(id,n)}
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
          dataItem= {dataItem}
          modalCloseDelete= { async n => this.closeModal(n) }
        />
      </React.Fragment>
    )
  }
}

export default AdminItem;
