import React from 'react';
import {
  Button,
  Row,
  Container,
  Col,
  Popover,
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
// import scrollIntoView from 'scroll-into-view-if-needed';
import {ReactComponent as SearchLogo} from '../../Assets/icons/searchIcon.svg';
import {ReactComponent as Filter} from '../../Assets/icons/filter.svg';
import sortOpt from '../Helpers/sortOption';
import adminAction from '../../redux/actions/admin';
import ModalLoading from '../ModalLoading';
import currencyFormat from '../../helpers/currencyFormat';
import ModalUpdate from './ModalUpdate';
import ModalConfirm from '../ModalConfirm';
import useWindowDimension from '../Helpers/useWindowDimension';

const CreateNewText = () => {
  const screenRatio = useWindowDimension();
  return (
    <text
      className={screenRatio.lg ? 'font-weight-bold' : 'font-weight-normal'}>
      +{screenRatio.lg ? '' : ' Add New'}
    </text>
  );
};

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
      openModalDelete: false,
      openSuccessDelete: false,
      deleteId: null,
      deleteName: '',
      selectedItemId: null,
      openModalUpdate: false,
      filterPopover: false,
    };
    this.topRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.adminDelete.deleteItemPending !==
      this.props.adminDelete.deleteItemPending
    ) {
      if (this.props.adminDelete.deleteItemSuccess) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          openSuccessDelete: this.props.adminDelete.deleteItemSuccess,
        });
      }
    }
    // if (prevProps.admin.getDataPending !== this.props.admin.getDataPending) {
    //   if (this.props.admin.getDataSuccess) {
    //     this.scroll(this.topRef);
    //   }
    // }
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
    this.setState({
      selectedItemId: id,
      modalOpenUpdate: true,
    });
  };

  openDelete = (id, name) => {
    this.setState({
      openModalDelete: true,
      deleteId: id,
      deleteName: name,
    });
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
            <CreateNewText />
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
                  style={{height: '2.5em'}}
                  value={this.state.search}
                  onChange={(e) => {
                    this.setState({
                      search: e.target.value,
                    });
                  }}
                />
                <InputGroupAddon addonType="append">
                  <Button color="success" type="submit">
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
            onClick={() =>
              this.setState((prevState) => ({
                filterPopover: !prevState.filterPopover,
              }))
            }
            color="success"
            name="PopoverLegacy"
            id="PopoverLegacy"
            style={{marginBottom: '1rem'}}>
            <Filter />
          </Button>
          <Popover
            toggle={() =>
              this.setState((prevState) => ({
                filterPopover: !prevState.filterPopover,
              }))
            }
            isOpen={this.state.filterPopover}
            placement="bottom"
            target="PopoverLegacy">
            <div className="pt-2 px-2">
              <Form onSubmit={this.handleSearchSort}>
                <Label for="sortKey">Sort by</Label>
                <Select
                  id="sortKey"
                  className="mb-4"
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
                  <div className="d-flex justify-content-around">
                    <Button
                      className="rounded-pill my-3"
                      color="success"
                      onClick={() =>
                        this.setState((prevState) => ({
                          filterPopover: !prevState.filterPopover,
                        }))
                      }>
                      Close
                    </Button>
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
          </Popover>
        </div>
        <Row ref={this.topRef} xs="2">
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
                pageInfo.dataPerPage === '-'
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
                    <span className="text-center">
                      {currencyFormat(item.price)}
                    </span>
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
                          onClick={() => this.openDelete(item.id, item.name)}
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

        {/* modal for delete */}
        <ModalConfirm
          modalOpen={this.state.openModalDelete}
          confirm={() => {
            this.props.deleteItem(this.props.auth.token, this.state.deleteId);
            this.setState({
              openModalDelete: false,
            });
          }}
          close={() => {
            this.setState({
              openModalDelete: false,
            });
          }}
          content={`Are you sure want to delete ${this.state.deleteName} from the list?`}
          title="Confirm Deletion"
        />
        <ModalLoading modalOpen={this.props.adminDelete.deleteItemPending} />
        <ModalConfirm
          title="Success!"
          modalOpen={this.state.openSuccessDelete}
          close={() => {
            this.props.getItemSeller(this.props.auth.token, this.props.query);
            this.setState({openSuccessDelete: false});
          }}
          confirm={() => {
            this.props.getItemSeller(this.props.auth.token, this.props.query);
            this.setState({openSuccessDelete: false});
          }}
          content="Success Delete Item"
        />

        {/* modal for detail */}
        <ModalUpdate
          modalOpenUpdate={this.state.modalOpenUpdate}
          item_id={this.state.selectedItemId}
          modalCloseUpdate={() => {
            this.props.getItemSeller(this.props.auth.token, this.props.query);
            this.setState({
              selectedItemId: null,
              modalOpenUpdate: false,
            });
          }}
        />
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
  adminDelete: state.adminDelete,
});

const mapDispatchToProps = {
  addItem: adminAction.addNewItem,
  addQuery: adminAction.addQuery,
  getItemSeller: adminAction.getAdminItems,
  getItemDetail: adminAction.getItemDetails,
  deleteItem: adminAction.deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemTable);
