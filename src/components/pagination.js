import React from 'react';
import { 
  Pagination,
  PaginationItem,
  PaginationLink 
} from 'reactstrap';
import qs from 'querystring';


// COMPONENTS
class Paging extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pageInfo: {},
      queryPage: {},
      link: []
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
          item = [ item, `http://localhost:8080/items/?${qs.stringify({...this.props.queryPage, ... {page: item}})}`]
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
              <PaginationLink first onClick={(e) => this.handlePageClick(1, e)} href={`http://localhost:8080/items/?${qs.stringify({...this.props.queryPage, ... {page: 1}})}`} />
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
            <PaginationLink last onClick={(e) => this.handlePageClick((this.props.pageInfo.pages), e) } href={`http://localhost:8080/items/?${qs.stringify({...this.props.queryPage, ... {page: this.props.pageInfo.pages}})}`} />
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
    let query = {
      ...this.props.queryPage,
      page
    }
    console.log(query)
    await this.props.changePage(query)
  };


  render(){
    const { pageInfo, queryPage, link } = this.props
    return(
      <React.Fragment>
        <div className='my-3'>
          <Pagination aria-label="Page navigation">
            {this.getPrev()}
            {this.getMid()}           
            {this.getNext()}
          </Pagination>
        </div>
      </React.Fragment>
    )
  }
}


export default Paging;