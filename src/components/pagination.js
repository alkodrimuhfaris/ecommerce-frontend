import React from 'react';
import Pagination from "react-js-pagination";

// COMPONENTS
class Paging extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      pageInfo: {}
    }
  }

  handlePageClick = (e) => {
    console.log(e)
    const selectedPage = e;
    // const offset = selectedPage * this.state.pageInfo.limitPerPage;

    this.setState({
        pageInfo: { currentPage : selectedPage }
    }, async () => {
        await this.getData()
    });
  };

  render(){
    const { pageInfo } = this.state
    return(
      <Container className='my-3 d-flex align-items-center justify-content-center'>
        <Pagination
          activePage={pageInfo.currentPage}
          pageRangeDisplayed={5}
          itemsCountPerPage={pageInfo.limitPerPage}
          totalItemsCount={pageInfo.count}
          onChange={this.handlePageClick}
          itemClass="page-item"
          linkClass="page-link"
        />
      </Container>
      )
  }
}


export default Paging;