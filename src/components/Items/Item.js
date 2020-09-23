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
import stringify from '../Helpers/stringObj'
import qs from 'querystring'
import ItemTable from './ItemTable';


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
      oldQueryPage: {
        page: 1,
        limit: 5,
        search: {
          name: ''
        },
        sort: {
          id: 0
        }
      },
      url: 'http://localhost:8080/items/?page=1&limit=5&search=&sort=',
      defUrl: 'http://localhost:8080/items/?page=1&limit=5&search=&sort=',
      changeUrl: 'http://localhost:8080/items',
      popUpMsg: '',
      searchKey: 'name',
      sortKey: 'id',
      searchValue: '',
      sortValue: 0,
      allCategories: [],
      categoryItem: []
    }
  }

  async componentDidMount(){
    await this.getData()
  }

  stringifyObj = (params) => {
    if (Object.keys(params).length) {
      const newParams = Object.entries(params)
      Object.entries(params)
      .forEach( item => {
        let key = item[0]
        let val = item[1]
        if (typeof(val)==='object') {
          Object.entries(val).forEach( nestItem => {
            nestItem =[`${key}[${nestItem[0]}]`, nestItem[1]]
            newParams.push(nestItem)
          })
        } else {
          newParams.push(item)
        }
      })
      params = newParams.filter(item => {
        return typeof(item[1])!=='object'
      })
      console.log('params yang di-filter')
      console.log(params)

      let paramsObj = {}

      params.forEach(item => {
        Object.assign(paramsObj, {[item[0]]: item[1] })
      })
      params = paramsObj
      console.log('params yang di-array-kan')
      console.log(params)
      console.log(qs.stringify(params))
      return params
    } else {
      return params
    }
  }

  getData = async (params = this.state.queryPage) => {
    const stringParams = stringify(params)
    console.log(stringParams)
    let allCategories = await axios.get('http://localhost:8080/categories?page=1&sort[categories.name]=&limit=-')
    allCategories = allCategories.data.data
    const dataGet = await axios.get('http://localhost:8080/items/?'+stringParams)
    const { pageInfo, data } = dataGet.data
    const queryPage = {
      ...params,
      page: pageInfo.currentPage,
      limit: pageInfo.limitPerPage
    }
    console.log(pageInfo)
    console.log(params)
    if (!data){
      this.setState({
        data: {},
        pageInfo,
        allCategories,
        queryPage
      })
    } else {
      this.setState({
        data,
        pageInfo,
        allCategories,
        queryPage
      })
    }
  }
   
  openModalDetailDelete = async (url, n) => {
    url = 'http://localhost:8080/items/'.concat(url)
    let dataItem = await axios.get(url)
    dataItem = dataItem.data.choosenData
    let categoryItem = await axios.get('http://localhost:8080/categories/'.concat(dataItem.category_id))
    categoryItem = categoryItem.data
    console.log('openModalDetail')
    if (n) {
      this.setState({
        modalOpenDelete: true,
        delUrl: url,
        dataItem,
        categoryItem
      })
    } else {
      this.setState({
        modalOpenDetail: true,
        delUrl: url,
        dataItem,
        categoryItem
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
    const { 
      data, 
      dataItem,
      delUrl, 
      formUpdate,
      pageInfo,
      allCategories,
      categoryItem 
    } = this.state
    console.log(pageInfo)
    return(
      <React.Fragment>
        <NavBar/>
        <Container className='my-3'>
          <h1  className = "my-3">Items on Tuku</h1>
          <ItemTable 
            data={data}
            pageInfo={pageInfo}
            categories={allCategories}
            queryPage = {this.state.queryPage}
            queryOld = {this.state.oldQueryPage}
            applyChange = {async url => this.getData(url)}
            openNew = {() => this.setState({modalOpenNew: true})}
            openDetail = {(id,n) => this.openModalDetailDelete(id,n)}
            openDelete = {(id,n) => this.openModalDetailDelete(id,n)} 
          />
          <Pagination
            data = {this.state.data}
            pageInfo = {this.state.pageInfo}
            queryPage = {this.state.queryPage}
            changePage = {async params => this.getData(params)}
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
          category={categoryItem}
          modalCloseDetail={async n => this.closeModal(n)}
          openDelete = {(id,n) => this.openModalDetailDelete(id,n)}
        />
        <ModalUpdate
          modalOpenUpdate={this.state.modalOpenUpdate}
          formUpdate={formUpdate}
          id={dataItem.id}
          categories={allCategories}
          modalDetail= { (id,n) => this.openModalDetailDelete(id,n)}
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
