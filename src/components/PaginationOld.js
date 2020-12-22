

import React from 'react';
import {Pagination, PaginationItem, PaginationLink, Input} from 'reactstrap';
import qs from 'querystring';
import {connect} from 'react-redux';
import adminAction from '../redux/actions/admin';
import propTypes from 'prop-types';

// COMPONENTS
class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageInfo: {},
      queryPage: {},
      link: [],
      limit: 5,
      page: 1,
    };
  }

  getArrLink = () => {
    let link = [];
    if (Object.keys(this.props.pageInfo).length) {
      const {currentPage} = this.props.pageInfo;
      console.log('change page');
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        link.push(i);
      }
      link = link.map((item) => {
        if (item < 1 || item > this.props.pageInfo.pages) {
          item = ['', '#'];
        } else {
          item = [
            item,
            `${process.env.REACT_APP_URL_BACKEND}/items/?${qs.stringify({
              ...this.props.queryPage,
              ...{page: item},
            })}`,
          ];
        }
        return item;
      });
      console.log(link);
    } else {
      link = [];
    }
    return link;
  };

  getPrev = () => {
    let prev = 0;
    if (Object.keys(this.props.pageInfo).length) {
      if (this.props.pageInfo.currentPage > 1) {
        prev = (
          <>
            <PaginationItem>
              <PaginationLink
                first
                onClick={(e) => this.handlePageClick(1, e)}
                href={`${
                  process.env.REACT_APP_URL_BACKEND
                }/items?${qs.stringify({
                  ...this.props.queryPage,
                  ...{page: 1},
                })}`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                previous
                onClick={(e) =>
                  this.handlePageClick(this.props.pageInfo.currentPage - 1, e)
                }
                href={this.props.pageInfo.prefLink}
              />
            </PaginationItem>
          </>
        );
      } else {
        prev = (
          <>
            <PaginationItem disabled>
              <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink previous href="#" />
            </PaginationItem>
          </>
        );
      }
    } else {
      prev = 0;
    }
    return prev;
  };

  getNext = () => {
    let next = 0;
    if (Object.keys(this.props.pageInfo).length) {
      if (this.props.pageInfo.currentPage < this.props.pageInfo.pages) {
        next = (
          <>
            <PaginationItem>
              <PaginationLink
                next
                onClick={(e) =>
                  this.handlePageClick(this.props.pageInfo.currentPage + 1, e)
                }
                href={this.props.pageInfo.nextLink}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={(e) =>
                  this.handlePageClick(this.props.pageInfo.pages, e)
                }
                href={`${
                  process.env.REACT_APP_URL_BACKEND
                }/items/?${qs.stringify({
                  ...this.props.query,
                  ...{page: this.props.pageInfo.pages},
                })}`}
              />
            </PaginationItem>
          </>
        );
      } else {
        next = (
          <>
            <PaginationItem disabled>
              <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem disabled>
              <PaginationLink last href="#" />
            </PaginationItem>
          </>
        );
      }
    }
    return next;
  };

  getMid = () => {
    let mid = 0;
    mid =
      Object.keys(this.props.pageInfo).length &&
      this.getArrLink().map((item) => {
        if (item[0] === this.props.pageInfo.currentPage) {
          return (
            <PaginationItem active>
              <PaginationLink
                onClick={(e) => this.handlePageClick(item[0], e)}
                href={item[1]}
              >
                {item[0]}
              </PaginationLink>
            </PaginationItem>
          );
        }
        if (item[0]) {
          return (
            <PaginationItem>
              <PaginationLink
                onClick={(e) => this.handlePageClick(item[0], e)}
                href={item[1]}
              >
                {item[0]}
              </PaginationLink>
            </PaginationItem>
          );
        }
        return (
          <PaginationItem disable>
            <PaginationLink href={item[1]}>&nbsp;</PaginationLink>
          </PaginationItem>
        );
      });
    return mid;
  };

  handlePageClick = async (page, key) => {
    key.preventDefault();
    console.log(key.target.href);
    console.log(page);
    const {limit} = this.state;
    console.log(limit);
    const queryPage = {
      ...this.props.query,
      limit,
      page,
    };
    console.log('ini query dari pageKlik');
    console.log(queryPage);
    this.props.adminAction.getAdminItems(queryPage);
    this.props.adminAction.addQuery(queryPage);
  };

  limitPage = async (e) => {
    e.preventDefault();
    e = e.target.value;
    const query = {
      ...this.props.query,
      limit: e,
    };
    console.log(query);
    this.props.adminAction.getAdminItems(query);
    this.setState({
      limit: e,
    });
  };

  render() {
    const {pageInfo, queryPage, link} = this.props;
    return (
      <>
        <div className="my-3 row justify-content-center">
          <div className="col-2">Displaying</div>
          <div className="col-2">
            <Input
              type="select"
              name="limit"
              id="limit"
              value={this.state.limit}
              onChange={this.limitPage}
            >
              <option value={5} selected>
                5
              </option>
              <option value={10} selected>
                10
              </option>
              <option value={25} selected>
                25
              </option>
              <option value="-" selected>
                All
              </option>
            </Input>
          </div>
          <div className="col-2">
            from {Object.keys(this.props.pageInfo).length && pageInfo.count}
          </div>
        </div>
        <div className="my-3 row justify-content-center">
          <div className="col-7">
            <div className="d-flex justify-content-center">
              <Pagination aria-label="Page navigation" className="mx-auto">
                {this.getPrev()}
                {this.getMid()}
                {this.getNext()}
              </Pagination>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Paging.propTypes = {
  pageInfo: propTypes.objectOf(propTypes.object).isRequired,
  query: propTypes.objectOf(propTypes.object).isRequired,
  adminAction: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  query: state.admin.query,
});

const mapDispatchToProps = {
  adminAction: adminAction.getAdminItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);
