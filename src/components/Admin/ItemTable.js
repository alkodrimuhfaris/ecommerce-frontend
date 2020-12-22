import React from 'react';
import {
  Button,
  Row,
  Container,
  Col,
  UncontrolledPopover,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import {ReactComponent as SearchLogo} from '../../Assets/icons/searchIcon.svg';
import {ReactComponent as Filter} from '../../Assets/icons/filter.svg';
import sortOpt from '../Helpers/sortOption';
import adminAction from '../../redux/actions/admin';
import ModalLoading from '../ModalLoading';

class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {value: {sort: {created_at: 'DESC'}}, label: 'Terbaru'},
      search: '',
      before: '',
      after: '',
      defaultQuery: {
        sort: {value: {sort: {created_at: 'DESC'}}, label: 'Terbaru'},
        search: '',
        before: '',
        after: '',
      },
      applyBtn: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.props.getItemSeller(this.props.auth.token);
    }
  }

  handleSearchSort = (e) => {
    e.preventDefault();
    const {before, after} = this.state;
    const search = this.state.search ? {name: this.state.search} : undefined;
    const sort = Object.keys(this.state.sort).length
      ? this.state.sort.value.sort
      : undefined;
    const date = {before, after};
    const queryAdmin = {
      ...this.props.query,
      search,
      date,
      sort,
    };
    this.props.addQuery(queryAdmin);
  };

  // reset search and sort value
  handleDefault = () => {
    this.setState((prevState) => ({
      ...prevState,
      ...prevState.defaultQuery,
    }));
  };

  getItemDetail = (id) => {
    this.props.getItemDetail(this.props.auth.token, id);
    this.props.openDetail(id);
  };

  render() {
    const {admin} = this.props;
    const {pageInfo} = admin;
    const {sellerProducts: data} = this.props;
    return (
      <Container>
        <div className="d-flex my-3 align-items-start justify-content-around">
          <Button
            onClick={() => this.props.openNew()}
            color="success"
            className="mr-3 rounded-pill">
            + Add new
          </Button>
          <Form
            className="w-75 align-items-center"
            onSubmit={this.handleSearchSort}>
            <FormGroup>
              <InputGroup>
                <Input
                  type="name"
                  name="searchVal"
                  id="searchVal"
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({
                      search: e.target.value,
                    });
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button type="submit">
                    <SearchLogo />
                  </Button>
                  <ModalLoading modalOpen={this.props.admin.getDataPending} />
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Form>
          <Button
            className="ml-2"
            outline
            color="success"
            name="PopoverLegacy"
            id="PopoverLegacy"
            style={{marginBottom: '1rem'}}>
            <Filter />
          </Button>
          <UncontrolledPopover
            trigger="legacy"
            placement="bottom"
            target="PopoverLegacy">
            <div className="p-1">
              <Form onSubmit={this.handleSearchSort}>
                <Label for="sortKey">Sort by</Label>
                <Select
                  id="sortKey"
                  value={this.state.sort}
                  options={sortOpt}
                  onChange={(e) => this.setState({sort: e})}
                />
                <FormGroup>
                  <Label for="filterDateFrom">From Date</Label>
                  <Input
                    type="date"
                    name="dateFromVal"
                    id="filterDateFrom"
                    value={this.state.after}
                    onChange={(e) => this.setState({after: e.target.value})}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="filterDateTo">To Date</Label>
                  <Input
                    type="date"
                    name="dateToVal"
                    id="filterDateTo"
                    value={this.state.before}
                    onChange={(e) => this.setState({before: e.target.value})}
                  />
                  <div className="d-flex justify-content-center">
                    <Button
                      className="rounded-pill my-3"
                      outline
                      color="danger"
                      onClick={this.handleDefault}>
                      Abort All
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </UncontrolledPopover>
        </div>
        {/* <Row xs="2">
          <Col xs="3">
          </Col>
          <Col xs="9">
            <div className="d-flex justify-content-between my-3">
              <div>
              </div>
            </div>
          </Col>
        </Row> */}
        <Row xs="2">
          <Col
            className="d-flex align-items-center justify-content-center border px-2 py-3"
            md="2"
            xs="3">
            <span className="text-center">No.</span>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center border px-2 py-3"
            md="3"
            xs="3">
            <span className="text-center">Item name</span>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center border px-2 py-3"
            md="3"
            xs="3">
            <span className="text-center">Item price</span>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center border px-2 py-3"
            md="4"
            xs="3">
            <span className="text-center">Action</span>
          </Col>
        </Row>
        {/* eslint-disable-next-line no-nested-ternary */}
        {Object.keys(data).length ? (
          pageInfo.count !== 0 ? (
            data.map((item, index) => {
              const page =
                pageInfo.limit === '-'
                  ? index + 1
                  : index +
                    1 +
                    pageInfo.dataPerPage * (pageInfo.currentPage - 1);
              return (
                <Row xs="2">
                  <Col
                    md="2"
                    xs="3"
                    className="border d-flex align-items-center justify-content-center px-2 py-3">
                    <span className="text-center">{page}</span>
                  </Col>
                  <Col
                    md="3"
                    xs="3"
                    className="border d-flex align-items-center justify-content-center px-2 py-3">
                    <span className="text-center">{item.name}</span>
                  </Col>
                  <Col
                    md="3"
                    xs="3"
                    className="border d-flex align-items-center justify-content-center px-2 py-3">
                    <span className="text-center">{item.price}</span>
                  </Col>
                  <Col
                    md="4"
                    xs="3"
                    className="border d-flex align-items-center justify-content-center px-2 py-3">
                    <Row className="row justify-content-around">
                      <div
                        className="col-md-4 d-flex align-items-center justify-content-center my-1"
                        xs="12">
                        <Button
                          onClick={() => this.getItemDetail(item.id)}
                          color="success"
                          className="rounded-pill">
                          Detail
                        </Button>
                      </div>
                      <div
                        className="col-md-4 d-flex align-items-center justify-content-center my-1"
                        xs="12">
                        <Button
                          onClick={() =>
                            this.props.openDelete(item.id, item.name)
                          }
                          color="danger"
                          className="rounded-pill">
                          Delete
                        </Button>
                      </div>
                    </Row>
                  </Col>
                </Row>
              );
            })
          ) : (
            <Container
              className="d-flex align-items-center justify-content-center border px-2 py-3"
              md="3"
              xs="3">
              <span className="text-center" color="danger">
                {admin.getDataMessage}
              </span>
            </Container>
          )
        ) : null}
      </Container>
    );
  }
}

ItemTable.propTypes = {
  admin: propTypes.objectOf(propTypes.object).isRequired,
  sellerProducts: propTypes.objectOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  sellerProducts: state.admin.sellerProducts,
  pageInfo: state.admin.pageInfo,
  query: state.admin.query,
});

const mapDispatchToProps = {
  addItem: adminAction.addNewItem,
  addQuery: adminAction.addQuery,
  getItemSeller: adminAction.getAdminItems,
  getItemDetail: adminAction.getItemDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTable);
