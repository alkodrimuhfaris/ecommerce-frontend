import React from 'react';
import {useSelector} from 'react-redux';
import {Container, Row} from 'reactstrap';
import {Helmet} from 'react-helmet';
import Pagination from '../Pagination';
import NavBar from '../NavBarClient';
import ItemCard from '../ItemCard';
import ModalLoading from '../ModalLoading';

export default function SearchItem() {
  const query = useSelector((state) => state.searchQuery.query);
  const searchData = useSelector((state) => state.items.searchData);
  const searchIsPending = useSelector((state) => state.items.searchIsPending);
  // const searchIsError = useSelector((state) => state.items.searchIsError);
  // const searchIsSuccess = useSelector((state) => state.items.searchIsSuccess);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    console.log(query);
    const searchObj = query.search ? query.search : '';
    if (searchObj) {
      const searchVal = Object.values(searchObj)[0];
      setSearch(searchVal);
    }
  }, [query]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Search result for: ${search} || Tuku!`}</title>
      </Helmet>
      <NavBar inSearchPage />
      <Container>
        <ModalLoading modalOpen={searchIsPending} />
        <h3 className="mt-3 mb-1">Search result for: {search}</h3>
        <Row className="justify-content-md-center no-gutters mt-3 mb-5">
          {searchData.length
            ? searchData.map((product) => <ItemCard product={product} />)
            : null}
        </Row>
        <Pagination />
      </Container>
    </>
  );
}
