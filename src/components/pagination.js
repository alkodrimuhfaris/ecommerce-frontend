import React from 'react';
import { 
  Pagination,
  PaginationItem,
  PaginationLink,
  Input
} from 'reactstrap';
import stringify from 'string.ify';


// COMPONENTS
class Paging extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pageInfo: {},
      queryPage: {},
      link: [],
      limit: 5,
      page: 1
    }
  }

  getArrLink = () => {
    let link = []
    if (Object.keys(this.props.pageInfo).length) {
      let { currentPage } = this.props.pageInfo
      console.log('change page')
      for (let i = currentPage-2 ; i <= currentPage+2; i++){
        link.push(i)
      }
      link = link.map(item => {
        if(item<1 || item>this.props.pageInfo.pages){
          item = ['','#']
        } else {
          item = [ item, `http://localhost:8080/items/?${stringify({...this.props.queryPage, ... {page: item}})}`]
        }
        return item
      })
      console.log(link)
    } else {
      link = []
    }
    return link
  }

  getPrev = () => {
    let prev = 0
    if (Object.keys(this.props.pageInfo).length) {
      if (this.props.pageInfo.currentPage > 1) 
      {
        prev =
          <React.Fragment>
            <PaginationItem>
              <PaginationLink first onClick={(e) => this.handlePageClick(1, e)} href={`http://localhost:8080/items/?${stringify({...this.props.queryPage, ... {page: 1}})}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={(e) => this.handlePageClick((this.props.pageInfo.currentPage-1), e)} href={this.props.pageInfo.prefLink} />
            </PaginationItem>
          </React.Fragment>
      } else {
        prev =
          <React.Fragment>
            <PaginationItem disabled>
              <PaginationLink first href='#' />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink previous href='#'/>
            </PaginationItem>
          </React.Fragment>
      }
    } else {
      prev = 0
    }
    return prev
  }

  getNext = () => {
    let next = 0
    if (Object.keys(this.props.pageInfo).length){
      if (this.props.pageInfo.currentPage < this.props.pageInfo.pages) {
        next =
        <React.Fragment>
          <PaginationItem>
            <PaginationLink next onClick={(e) => this.handlePageClick((this.props.pageInfo.currentPage+1), e)} href={this.props.pageInfo.nextLink} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={(e) => this.handlePageClick((this.props.pageInfo.pages), e) } href={`http://localhost:8080/items/?${stringify({...this.props.queryPage, ... {page: this.props.pageInfo.pages}})}`} />
          </PaginationItem>
        </React.Fragment>
      } else { 
        next =
        <React.Fragment>
          <PaginationItem disabled>
            <PaginationLink next href='#' />
          </PaginationItem>
          <PaginationItem disabled>
            <PaginationLink last href='#' />
          </PaginationItem>
        </React.Fragment>
      }
    }
    return next
  }

  getMid = () => {
    let mid = 0
    mid =
    Object.keys(this.props.pageInfo).length &&
    this.getArrLink().map(item => {
      if(item[0] === this.props.pageInfo.currentPage) {
        return(
          <PaginationItem active>
            <PaginationLink onClick={ (e) => this.handlePageClick(item[0], e) } href={item[1]}>
              {item[0]}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (item[0]) {
        return(
          <PaginationItem>
            <PaginationLink onClick={(e) => this.handlePageClick(item[0], e)} href={item[1]}>
              {item[0]}
            </PaginationLink>
          </PaginationItem>
        )
      } else {
        return(
          <PaginationItem disable>
            <PaginationLink href={item[1]}>
              &nbsp;
            </PaginationLink>
          </PaginationItem>
        )
      }
    })
    return mid
  }


  handlePageClick = async (page, key) => {
    key.preventDefault()
    console.log(key.target.href)
    console.log(page)
    let limit=this.state.limit
    console.log(limit)
    let queryPage = {
      ...this.props.queryPage,
      limit,
      page
    }
    console.log('ini query dari pageKlik')
    console.log(queryPage)
    await this.props.changePage(queryPage)
    this.setState({
      queryPage,
      page,
      limit
    })
  };

  limitPage = async (e) => {
    e.preventDefault()
    e = e.target.value
    let query = {
      ...this.props.queryPage,
      limit: e
    }
    console.log(query)
    await this.props.changePage(query)
    this.setState({
      limit: e
    })
  }


  render(){
    const { pageInfo, queryPage, link } = this.props
    return(
      <React.Fragment>
        <div className='my-3 row justify-content-center'>
          <div className='col-2'>Displaying</div>
          <div className='col-2'>
            <Input type="select" name="limit" id="limit" value={this.state.limit} onChange={this.limitPage}>
              <option value={5} selected>5</option>
              <option value={10} selected>10</option>
              <option value={25} selected>25</option>
              <option value='-' selected>All</option>
            </Input>
          </div>
          <div className='col-2'>
            from {Object.keys(this.props.pageInfo).length && pageInfo.count}
          </div>
        </div>
        <div className='my-3 row justify-content-center'>
          <div className='col-7'>
            <div className='d-flex justify-content-center'>
              <Pagination aria-label="Page navigation" className='mx-auto'>
                {this.getPrev()}
                {this.getMid()}           
                {this.getNext()}
              </Pagination>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default Paging;