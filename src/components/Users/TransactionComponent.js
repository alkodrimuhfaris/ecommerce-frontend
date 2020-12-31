/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Row,
  Col,
  Form,
  Button,
  Label,
  FormGroup,
  Input,
  Spinner,
} from 'reactstrap';
import Select from 'react-select';
import {FiFilter} from 'react-icons/fi';
import {useSelector, useDispatch} from 'react-redux';
import Popover from '../Popover';
import actions from '../../redux/actions/index';
import useWindowDimension from '../Helpers/useWindowDimension';
import currencyFormat from '../../helpers/currencyFormat';
import ModalConfirm from '../ModalConfirm';
import ModalLoading from '../ModalLoading';
import Pagination from '../Pagination';
import TransactionDetail from './TransactionDetail';

export default function TransactionComponent() {
  const dispatch = useDispatch();
  const {md, xs} = useWindowDimension();
  const {searchQueryActions, transactionActions} = actions;
  const dataTransaction = useSelector(
    (state) => state.allTransaction.transactions,
  );
  const pageInfo = useSelector((state) => state.allTransaction.pageInfo);
  const allTransaction = useSelector((state) => state.allTransaction);
  const query = useSelector((state) => state.searchQuery.query);
  const token = useSelector((state) => state.auth.token);
  const [filterPopOver, setFilterPopOver] = React.useState(false);
  const [before, setBefore] = React.useState('');
  const [after, setAfter] = React.useState('');
  const [data, setData] = React.useState({
    value: {data: {}},
    label: 'all transaction',
  });
  const payTransaction = useSelector((state) => state.payTransaction);
  const [sort, setSort] = React.useState({
    value: {sort: {created_at: 'DESC'}},
    label: 'Newest',
  });
  const [detailTransaction, setDetailTransaction] = React.useState(false);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});

  const dataOpt = [
    {
      value: {data: {}},
      label: 'all transaction',
    },
    {
      value: {data: {status: false}},
      label: 'unpaid transaction',
    },
  ];

  const sortOpt = [
    {
      value: {sort: {created_at: 'DESC'}},
      label: 'Newest',
    },
    {
      value: {sort: {created_at: 'ASC'}},
      label: 'Oldest',
    },
    {
      value: {sort: {total_price: 'ASC'}},
      label: 'Price (cheapest)',
    },
    {
      value: {sort: {total_price: 'DESC'}},
      label: 'Price (highest)',
    },
  ];

  const handleDefault = (e) => {
    e.preventDefault();
    setData({value: {data: {}}, label: 'all transaction'});
    setSort({
      value: {sort: {created_at: 'DESC'}},
      label: 'Newest',
    });
    setBefore('');
    setAfter('');
  };

  const commitFilter = (e) => {
    e.preventDefault();
    const thisSort = Object.keys(sort).length ? sort.value.sort : undefined;
    const date = {before, after};
    const queryNew = {
      ...query,
      date,
      data: data.value.data,
      sort: thisSort,
    };
    dispatch(searchQueryActions.addQuery(queryNew));
  };

  const getDetailTransaction = (id) => {
    dispatch(transactionActions.getTransactionById(token, id));
    setDetailTransaction(true);
  };

  const commitPayTransaction = (id) => {
    setPropsNotif({
      title: 'confirmation',
      content: 'pay this bill?',
      confirm: () => {
        dispatch(transactionActions.payTransaction(token, id));
        setOpenNotif(false);
      },
      close: () => {
        dispatch(transactionActions.getAllTransaction(token, query));
        setOpenNotif(false);
      },
    });
    setOpenNotif(true);
  };

  React.useEffect(() => {
    if (payTransaction.success) {
      setPropsNotif({
        title: 'Success!',
        content: payTransaction.message,
        confirm: () => {
          dispatch(transactionActions.clearNotifTransaction());
          dispatch(transactionActions.getAllTransaction(token, query));
          setOpenNotif(false);
        },
        close: () => {
          dispatch(transactionActions.clearNotifTransaction());
          dispatch(transactionActions.getAllTransaction(token, query));
          setOpenNotif(false);
        },
      });
      setOpenNotif(true);
    } else if (payTransaction.error) {
      setPropsNotif({
        title: 'Error!',
        content: payTransaction.message,
        confirm: () => {
          dispatch(transactionActions.clearNotifTransaction());
          dispatch(transactionActions.getAllTransaction(token, query));
          setOpenNotif(false);
        },
        close: () => {
          dispatch(transactionActions.clearNotifTransaction());
          dispatch(transactionActions.getAllTransaction(token, query));
          setOpenNotif(false);
        },
      });
      setOpenNotif(true);
    }
  }, [payTransaction.pending]);

  return (
    <>
      <ModalLoading modalOpen={payTransaction.pending} />
      <ModalConfirm modalOpen={openNotif} {...propsNotif} />
      <TransactionDetail
        modalOpen={detailTransaction}
        closeModal={() => setDetailTransaction(false)}
      />
      <div
        className="px-4 my-3 position-relative"
        style={{width: '100%', height: '50px'}}>
        <div
          className="px-4 position-absolute"
          style={{
            zIndex: 3,
            top: '50%',
            left: xs || md ? '50%' : '10%',
            transform: 'translate(-50%, -50%)',
          }}>
          <div
            className="my-3 position-relative"
            style={{display: 'inline-block'}}>
            <Button
              type="button"
              id="filterBtn"
              name="filterBtn"
              onClick={() => setFilterPopOver((prevState) => !prevState)}
              outline
              color="success"
              className={`btn-popover ${
                md ? 'btn-popover-md' : 'btn-popover-lg'
              }`}>
              <FiFilter size={md ? '0.75em' : '1em'} className="filter-icon" />
            </Button>
            <Popover isOpen={filterPopOver}>
              <div className="pt-2 px-2">
                <Form>
                  <Label for="dataKey">Data being show</Label>
                  <Select
                    id="dataKey"
                    className="mb-4"
                    value={data}
                    options={dataOpt}
                    onChange={(e) => setData(e)}
                  />
                  <Label for="sortKey">Sory By</Label>
                  <Select
                    id="sortKey"
                    className="mb-4"
                    value={sort}
                    options={sortOpt}
                    onChange={(e) => setSort(e)}
                  />
                  <FormGroup>
                    <Label for="filterDateFrom">From Date</Label>
                    <Input
                      type="date"
                      name="dateFromVal"
                      id="filterDateFrom"
                      value={after}
                      onChange={(e) => setAfter(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="filterDateTo">To Date</Label>
                    <Input
                      type="date"
                      name="dateToVal"
                      id="filterDateTo"
                      value={before}
                      onChange={(e) => setBefore(e.target.value)}
                    />
                    <div className="d-flex justify-content-between">
                      <Button
                        color="success"
                        className="rounded-pill my-3 mr-1"
                        onClick={commitFilter}>
                        Apply
                      </Button>
                      <Button
                        outline
                        color="danger"
                        className="rounded-pill ml-1 my-3"
                        onClick={handleDefault}>
                        Abort All
                      </Button>
                    </div>
                  </FormGroup>
                </Form>
              </div>
            </Popover>
          </div>
        </div>
      </div>

      <div className="w-100 overflow-auto" style={{minWidth: '500px'}}>
        <Row className="no-gutters">
          <Col
            xs="2"
            className="d-flex align-items-center justify-content-center border px-2 py-3">
            No.
          </Col>
          <Col
            xs="3"
            className="d-flex align-items-center justify-content-center border px-2 py-3">
            Invoice
          </Col>
          <Col
            xs="2"
            className="d-flex align-items-center justify-content-center border px-2 py-3">
            Status
          </Col>
          <Col
            xs="3"
            className="d-flex align-items-center justify-content-center border px-2 py-3">
            Total Price
          </Col>
          <Col
            xs="2"
            className="d-flex align-items-center justify-content-center border px-2 py-3">
            Action
          </Col>
        </Row>
        {allTransaction.pending ? (
          <div className="py-3 d-flex align-items-center justify-content-center">
            <Spinner color="success" size="sm" />
          </div>
        ) : pageInfo.count !== 0 ? (
          dataTransaction.map((item, index) => {
            const page =
              pageInfo.dataPerPage === '-'
                ? index + 1
                : index + 1 + pageInfo.dataPerPage * (pageInfo.currentPage - 1);
            return (
              <Row className="no-gutters">
                <Col
                  xs="2"
                  className="d-flex align-items-center justify-content-center border px-2 py-3">
                  <div>
                    <text
                      className="text-center"
                      style={{
                        fontSize: xs || md ? '0.5em' : '0.75em',
                      }}>
                      {page}
                    </text>
                  </div>
                </Col>
                <Col
                  xs="3"
                  className="d-flex align-items-center justify-content-center border px-2 py-3">
                  <div>
                    <text
                      className="text-center"
                      style={{
                        fontSize: xs || md ? '0.5em' : '0.75em',
                      }}>
                      {item.invoice}
                    </text>
                  </div>
                </Col>
                <Col
                  xs="2"
                  className="d-flex align-items-center justify-content-center border px-2 py-3">
                  <div>
                    <text
                      className="text-center"
                      style={{
                        fontSize: xs || md ? '0.5em' : '0.75em',
                      }}>
                      <strong>{item.status ? 'Paid' : 'Unpaid'}</strong>
                    </text>
                  </div>
                </Col>
                <Col
                  xs="3"
                  className="d-flex align-items-center justify-content-center border px-2 py-3">
                  <div>
                    <text
                      className="text-center"
                      style={{
                        fontSize: xs || md ? '0.5em' : '0.75em',
                      }}>
                      {currencyFormat(item.total_price)}
                    </text>
                  </div>
                </Col>
                <Col
                  xs="2"
                  className="d-flex flex-column align-items-center justify-content-center border px-2 py-3">
                  <div className="d-flex align-items-center justify-content-center my-1">
                    <Button
                      onClick={() => getDetailTransaction(item.id)}
                      color="success"
                      style={{
                        fontSize: xs || md ? '0.5em' : '0.75em',
                      }}
                      className="rounded-pill">
                      Detail
                    </Button>
                  </div>
                  {!item.status ? (
                    <div className="d-flex align-items-center justify-content-center my-1">
                      <Button
                        onClick={() => commitPayTransaction(item.id)}
                        color="danger"
                        style={{
                          fontSize: xs || md ? '0.5em' : '0.75em',
                        }}
                        className="rounded-pill">
                        Pay
                      </Button>
                    </div>
                  ) : null}
                </Col>
              </Row>
            );
          })
        ) : null}
        <Pagination />
      </div>
    </>
  );
}
