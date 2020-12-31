import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Spinner,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import currencyFormat from '../../helpers/currencyFormat';
import actions from '../../redux/actions/index';
import ModalLoading from '../ModalLoading';
import ModalConfirm from '../ModalConfirm';
import useWindowDimension from '../Helpers/useWindowDimension';

export default function Balance() {
  const {xs, md} = useWindowDimension();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);
  const {transactionActions, profileActions} = actions;
  const [nominal, setNominal] = React.useState(null);
  const topUp = useSelector((state) => state.topUp);
  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.profile);
  const [openNotif, setOpenNotif] = React.useState(false);
  const [propsNotif, setPropsNotif] = React.useState({});

  const commitTopUp = () => {
    console.log('do onclick');
    setPropsNotif({
      title: 'Confirmation',
      content: `Topping up your balance for ${currencyFormat(nominal)}`,
      confirm: () => {
        dispatch(transactionActions.topUp(token, nominal));
        setOpenNotif(false);
      },
      close: () => {
        setOpenNotif(false);
      },
    });
    setOpenNotif(true);
  };

  React.useEffect(() => {
    if (topUp.success) {
      setPropsNotif({
        title: 'Success!',
        content: topUp.message,
        confirm: () => {
          dispatch(transactionActions.clearNotifTopUp());
          dispatch(profileActions.getProfile(token));
          setOpenNotif(false);
        },
        close: () => {
          dispatch(transactionActions.clearNotifTopUp());
          dispatch(profileActions.getProfile(token));
          setOpenNotif(false);
        },
      });
      setOpenNotif(true);
    } else if (topUp.error) {
      setPropsNotif({
        title: 'Error!',
        content: topUp.message,
        confirm: () => {
          dispatch(transactionActions.clearNotifTopUp());
          dispatch(profileActions.getProfile(token));
          setOpenNotif(false);
        },
        close: () => {
          dispatch(transactionActions.clearNotifTopUp());
          dispatch(profileActions.getProfile(token));
          setOpenNotif(false);
        },
      });
      setOpenNotif(true);
    }
  }, [topUp.pending]);

  return (
    <>
      <ModalLoading modalOpen={topUp.pending} />

      <ModalConfirm modalOpen={openNotif} {...propsNotif} />
      <div className="container">
        {profile.getProfilePending ? (
          <div className="py-3 d-flex align-items-center justify-content-center">
            <Spinner color="success" size="sm" />
          </div>
        ) : (
          <div
            className={`my-3 d-flex align-items-center justify-content-center${
              xs || md ? ' flex-column' : ''
            }`}>
            <div className="mr-2">
              <text>
                <strong>Your balance: </strong>
              </text>
            </div>
            <div>
              <text>
                {userData.balance
                  ? currencyFormat(userData.balance)
                  : currencyFormat(0)}
              </text>
            </div>
          </div>
        )}
        <div className="my-3">
          <FormGroup>
            <Label for="price">Top Up!</Label>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Rp</InputGroupAddon>
              <Input
                type="number"
                name="price"
                id="price"
                value={nominal}
                onChange={(e) => setNominal(Number(e.target.value))}
                invalid={topUp.error}
              />
              {xs || md ? null : (
                <InputGroupAddon addonType="append">.00</InputGroupAddon>
              )}
            </InputGroup>
            {topUp.error ? (
              <text className="error-form">{topUp.message}</text>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Button
              type="button"
              color="success"
              outline
              disabled={!Number(nominal)}
              onClick={() => commitTopUp()}
              className="rounded-pill"
              style={{
                fontSize: xs || md ? '0.75em' : '1em',
              }}>
              Top up
            </Button>
          </FormGroup>
        </div>
      </div>
    </>
  );
}
