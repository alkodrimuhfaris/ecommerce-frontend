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
      link: [],
      prev: '',
      mid: '',
      next: ''
    }
  }

  getArrLink = () => {
    let link = []
    if (Object.keys(this.state.pageInfo)) {
      let { currentPage } = this.state.pageInfo
      console.log('change page')
      for (let i = currentPage-2 ; i <= currentPage+2; i++){
        link.push(i)
      }
      link = link.map(item => {
        if(item<1 || item>this.state.pageInfo.pages){
          item = ['','#']
        } else {
          item = [ item, `http://localhost:8080/items/?${qs.stringify({...this.state.queryPage, ... {page: item}})}`]
        }
        return item
      })
      console.log(link)
    } else {
      link = []
    }
    this.setState({
      link
    })
  }

  getPrev = () => {
    const { pageInfo, queryPage } = this.state
    let prev = 0
    if (Object.keys(pageInfo).length) {
      if (pageInfo.currentPage > 1) 
      {
        prev =
          <React.Fragment>
            <PaginationItem>
              <PaginationLink first onClick={this.handlePageClick} href={`http://localhost:8080/items/?${qs.stringify({...this.state.queryPage, ... {page: 1}})}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={this.handlePageClick} href={pageInfo.prefLink} />
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
    this.setState({
      prev
    })
  }

  getNext = () => {
    const { pageInfo, queryPage } = this.state
    let next = 0
    if (Object.keys(pageInfo).length){
      if (pageInfo.currentPage < pageInfo.pages) {
        next =
        <React.Fragment>
          <PaginationItem>
            <PaginationLink next onClick={this.handlePageClick} href={pageInfo.nextLink} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last onClick={this.handlePageClick} href={`http://localhost:8080/items/?${qs.stringify({...queryPage, ... {page: pageInfo.pages}})}`} />
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
    this.setState({
      next
    })
  }

  getMid = () => {
    const { pageInfo, queryPage, link } = this.state
    let mid = 0
    mid =
    Object.keys(pageInfo).length &&
    link.map(item => {
      if(item[0] === pageInfo.currentPage) {
        return(
          <PaginationItem active>
            <PaginationLink onClick={this.handlePageClick} href={item[1]}>
              {item[0]}
            </PaginationLink>
          </PaginationItem>
        )
      } else if (item[0]) {
        return(
          <PaginationItem>
            <PaginationLink onClick={this.handlePageClick} href={item[1]}>
              {item[0]}
            </PaginationLink>
          </PaginationItem>
        )
      } else {
        return(
          <PaginationItem disable>
            <PaginationLink onClick={this.handlePageClick} href={item[1]}>
              {item[0]}
            </PaginationLink>
          </PaginationItem>
        )
      }
    })
    this.setState({
      mid
    })
  }


  handlePageClick = async (key) => {
    key.preventDefault()
    console.log(key.target.href)
    await this.props.changePage(key.target.href)
  };

  componentDidMount(){
    this.getNext()
    this.getMid()
    this.getPrev()
    this.getArrLink()
    this.props.changePage()
  }

  componentDidUpdate(prevProps){
    if(this.props.pageInfo !== prevProps.pageInfo){
      this.setState({
        pageInfo: this.props.pageInfo,
        queryPage: this.props.queryPage,
      })
      this.getArrLink()
    }
  }

  render(){
    const { pageInfo, queryPage, link } = this.props
    return(
      <React.Fragment>
        <div className='my-3'>
          <Pagination aria-label="Page navigation">
            {this.state.prev}
            {this.state.mid}           
            {this.state.next}
          </Pagination>
        </div>
      </React.Fragment>
    )
  }
}


export default Paging;