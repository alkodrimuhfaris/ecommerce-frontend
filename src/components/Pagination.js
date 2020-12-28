import React from 'react';
import {Pagination, PaginationItem, PaginationLink, Input} from 'reactstrap';
import Select from 'react-select';
import qs from 'qs';
import {useSelector, useDispatch} from 'react-redux';
import '../Assets/style/Pagination.css';
import {useHistory} from 'react-router-dom';
import itemsAction from '../redux/actions/items';
import adminAction from '../redux/actions/admin';
import queryAction from '../redux/actions/searchQuery';
import useWindowDimension from './Helpers/useWindowDimension';

export default function PaginationHook({adminPage = false}) {
  const {md} = useWindowDimension();
  const dispatch = useDispatch();
  const history = useHistory();
  const isSeller = useSelector((state) => state.auth.isSeller);
  const queryAdmin = useSelector((state) => state.admin.query);
  const querySearch = useSelector((state) => state.searchQuery.query);
  const pageInfoAdmin = useSelector((state) => state.admin.pageInfo);
  const token = useSelector((state) => state.auth.token);
  const pageInfoSearch = useSelector((state) => state.items.searchPageInfo);
  const [pageInfo, setPageInfo] = React.useState({});
  const [limit, setLimit] = React.useState(10);
  const [extension, setExtension] = React.useState('/public/products?');
  const [optionPage, setOptionPage] = React.useState([]);
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 10,
  });

  const searchPage = (queryPage) => {
    if (adminPage) {
      dispatch(adminAction.addQuery(queryPage));
    } else {
      dispatch(queryAction.addQuery(queryPage));
    }
  };

  const dispatchSearch = () => {
    if (adminPage) {
      dispatch(adminAction.getAdminItems(token, query));
    } else {
      dispatch(itemsAction.searchItem(query));
    }
    history.push({search: qs.stringify(query)});
  };

  React.useEffect(() => {
    if (adminPage) {
      setQuery(queryAdmin);
    } else {
      setQuery(querySearch);
    }
  }, [queryAdmin, querySearch]);

  React.useEffect(() => {
    console.log(adminPage);
    const ext = adminPage ? '/items?' : '/public/products?';
    setExtension(ext);
  }, []);

  React.useEffect(() => {
    dispatchSearch();
    return () => dispatch(queryAction.clearQuery());
  }, []);

  React.useEffect(() => {
    if (adminPage && isSeller) {
      setPageInfo(pageInfoAdmin);
    } else {
      setPageInfo(pageInfoSearch);
    }
  }, [pageInfoAdmin, pageInfoSearch, isSeller]);

  React.useEffect(() => {
    dispatchSearch();
  }, [query]);

  React.useEffect(() => {
    let queryNew = {};
    if (limit === '-') {
      queryNew = {
        ...query,
        page: 1,
        limit,
      };
    } else if (pageInfo.currentPage > Math.ceil(pageInfo.count / limit)) {
      queryNew = {
        ...query,
        page: Math.ceil(pageInfo.count / limit),
        limit,
      };
    } else {
      queryNew = {
        ...query,
        limit,
      };
    }
    searchPage(queryNew);
  }, [limit]);

  React.useEffect(() => {
    const allpage = [...Array(pageInfo.pages).keys()].map((option) => {
      option += 1;
      option = {
        value: option,
        label: option,
      };
      return option;
    });
    setOptionPage(allpage);
  }, [pageInfo]);

  const handleChoosePage = (e) => {
    const newQuery = {
      ...query,
      page: e.value,
    };
    searchPage(newQuery);
  };

  const getArrLink = () => {
    let link = [];
    if (Object.keys(pageInfo).length) {
      const {currentPage} = pageInfo;
      console.log('change page');
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        link.push(i);
      }
      link = link.map((item) => {
        if (item < 1 || item > pageInfo.pages) {
          item = ['', '#'];
        } else {
          item = [
            item,
            `${
              process.env.REACT_APP_URL_BACKEND +
              extension +
              qs.stringify({
                ...query,
                ...{page: item},
              })
            }`,
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

  const handlePageClick = (page, key) => {
    key.preventDefault();
    console.log(key.target.href);
    console.log(page);
    console.log(limit);
    const queryPage = {
      ...query,
      page,
      limit,
    };
    console.log('ini query dari pageKlik');
    console.log(queryPage);
    searchPage(queryPage);
  };

  const getMid = () => {
    const mid = Object.keys(pageInfo).length
      ? getArrLink().map((item, index) => {
          if (item[0] === pageInfo.currentPage) {
            return (
              <PaginationItem key={index + 1} active>
                <PaginationLink
                  onClick={(e) => handlePageClick(item[0], e)}
                  href={item[1]}>
                  {item[0]}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (item[0]) {
            return (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  onClick={(e) => handlePageClick(item[0], e)}
                  href={item[1]}>
                  {item[0]}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={index + 1} disable>
              <PaginationLink href={item[1]}>&nbsp;</PaginationLink>
            </PaginationItem>
          );
        })
      : null;
    return mid;
  };

  const getPrev = () => {
    let prev = null;
    if (Object.keys(pageInfo).length) {
      if (pageInfo.currentPage > 1) {
        prev = (
          <>
            <PaginationItem>
              <PaginationLink
                color="success"
                first
                onClick={(e) => handlePageClick(1, e)}
                href={`${
                  process.env.REACT_APP_URL_BACKEND +
                  extension +
                  qs.stringify({
                    ...query,
                    page: 1,
                  })
                }`}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                color="success"
                previous
                onClick={(e) => handlePageClick(pageInfo.currentPage - 1, e)}
                href={pageInfo.prefLink}
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
      prev = null;
    }
    return prev;
  };

  const getNext = () => {
    let next = null;
    if (Object.keys(pageInfo).length) {
      if (pageInfo.currentPage < pageInfo.pages) {
        next = (
          <>
            <PaginationItem>
              <PaginationLink
                next
                onClick={(e) => handlePageClick(pageInfo.currentPage + 1, e)}
                href={pageInfo.nextLink}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={(e) => handlePageClick(pageInfo.pages, e)}
                href={`${
                  process.env.REACT_APP_URL_BACKEND +
                  extension +
                  qs.stringify({
                    ...query,
                    limit,
                    page: pageInfo.pages,
                  })
                }`}
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

  return (
    <>
      {Object.keys(pageInfo).length ? (
        <div className="my-3 d-flex align-items-center justify-content-center">
          <text>Displaying</text>
          <div className="limit-wrapper">
            <Input
              type="select"
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}>
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
          <text>
            from{' '}
            {Object.keys(pageInfo).length ? `${pageInfo.count} items` : '-'}
          </text>
        </div>
      ) : null}
      <div className="my-3 row justify-content-center">
        <div
          className={`col-12 col-md-5 d-flex justify-content-${
            md ? 'center' : 'end'
          }`}>
          <Pagination
            aria-label="Page navigation"
            className="d-flex align-items-center">
            {getPrev()}
            {getMid()}
            {getNext()}
          </Pagination>
        </div>
        {Object.keys(pageInfo).length ? (
          <div
            className={`col-12 col-md-4 d-flex align-items-start justify-content-${
              md ? 'center' : 'start'
            }`}>
            <div className="d-flex align-items-center">
              <text>page</text>
              <Select
                className="page-select-wrapper"
                placeholder="page"
                value={{
                  value: pageInfo.currentPage,
                  label: pageInfo.currentPage,
                }}
                options={optionPage}
                onChange={handleChoosePage}
              />
              <text>of {pageInfo.pages}</text>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
