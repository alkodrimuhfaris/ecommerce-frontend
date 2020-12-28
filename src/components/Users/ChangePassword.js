import React from 'react';
import {
  Input,
  Col,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
} from 'reactstrap';
import * as Yup from 'yup';
import {Formik, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import passwordAction from '../../redux/actions/password';
import '../../Assets/style/Form.css';
import ModalLoading from '../ModalLoading';
import ModalConfirm from '../ModalConfirm';

const passSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Enter your recent password!'),
  newPassword: Yup.string()
    .required('New Password must be provided!')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Enter your confirmation password!'),
});

export default function ChangePassword({md}) {
  const dispatch = useDispatch();
  const passwordUpdated = useSelector(
    (state) => state.password.passwordUpdated,
  );
  const passwordError = useSelector((state) => state.password.passwordError);
  const passwordPending = useSelector(
    (state) => state.password.passwordPending,
  );
  const passwordMessage = useSelector(
    (state) => state.password.passwordMessage,
  );
  const token = useSelector((state) => state.auth.token);
  const [openNotifPass, setOpenNotifPass] = React.useState(false);
  const [propsNotifPass, setPropsNotifPass] = React.useState({});
  const [funcReset, setFuncReset] = React.useState({reset: () => {}});

  React.useEffect(() => {
    if (passwordUpdated) {
      setPropsNotifPass({
        title: 'Success!',
        content: 'Success update password!',
        close: () => setOpenNotifPass(false),
        confirm: () => setOpenNotifPass(false),
      });
      setOpenNotifPass(true);
      funcReset.reset();
    }
    return () => dispatch(passwordAction.clearState());
  }, [passwordPending]);

  const initialValue = {
    oldPassword: '',
    confirmNewPassword: '',
    newPassword: '',
  };

  const postPassword = (value, reset) => {
    dispatch(passwordAction.changePassword(token, value));
    setFuncReset({
      reset: () => reset(),
    });
  };

  return (
    <>
      <h3 className="mt-4 mb-2">Password</h3>
      <Formik
        initialValues={initialValue}
        validationSchema={passSchema}
        validateOnBlur
        onSubmit={(values, {resetForm}) => {
          postPassword(values, resetForm);
        }}>
        {(props) => {
          const {
            touched,
            errors,
            handleSubmit,
            values,
            handleChange,
            handleBlur,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <Col xs="12" md="8" className="mb-3">
                <FormGroup row>
                  <Label
                    className={!md ? 'text-right' : 'text-left'}
                    for="name"
                    sm={3}>
                    Current password
                  </Label>
                  <Col sm={9}>
                    <Input
                      tag={Field}
                      type="password"
                      name="oldPassword"
                      id="oldPassword"
                      placeholder="Current Password"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors.oldPassword || passwordError}
                    />
                    {errors.oldPassword || touched.oldPassword ? (
                      <FormFeedback invalid>{errors.oldPassword}</FormFeedback>
                    ) : null}
                  </Col>
                </FormGroup>
                <FormGroup row className="mt-5">
                  <Label
                    className={!md ? 'text-right' : 'text-left'}
                    for="name"
                    sm={3}>
                    New password
                  </Label>
                  <Col sm={9}>
                    <Input
                      tag={Field}
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      placeholder="New Password"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={!errors.newPassword && touched.newPassword}
                      invalid={errors.newPassword || passwordError}
                    />
                    {errors.newPassword || touched.newPassword ? (
                      <FormFeedback invalid>{errors.newPassword}</FormFeedback>
                    ) : null}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label
                    className={!md ? 'text-right' : 'text-left'}
                    for="name"
                    sm={3}>
                    Confirm New password
                  </Label>
                  <Col sm={9}>
                    <Input
                      tag={Field}
                      type="password"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      placeholder="Confirm Password"
                      value={values.confirmNewPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={
                        !errors.confirmNewPassword && touched.confirmNewPassword
                      }
                      invalid={errors.confirmNewPassword || passwordError}
                    />
                    {errors.confirmNewPassword || touched.confirmNewPassword ? (
                      <FormFeedback invalid>
                        {errors.confirmNewPassword}
                      </FormFeedback>
                    ) : null}
                  </Col>
                </FormGroup>
              </Col>
              <Col xs="12" md="8" className="mb-3">
                <FormGroup row>
                  <Col
                    md={{size: 9, offset: 3}}
                    sm={12}
                    className={
                      md
                        ? 'd-flex align-items-center justify-content-center'
                        : ''
                    }>
                    <Button
                      color="success"
                      type="submit"
                      className="rounded-pill">
                      Change Password
                    </Button>
                  </Col>
                  {passwordError ? (
                    <Col
                      md={{size: 9, offset: 3}}
                      sm={12}
                      className={
                        md
                          ? 'd-flex align-items-center justify-content-center'
                          : ''
                      }>
                      <text className="error-form">{passwordMessage}</text>
                    </Col>
                  ) : null}
                </FormGroup>

                <ModalLoading modalOpen={passwordPending} />

                <ModalConfirm modalOpen={openNotifPass} {...propsNotifPass} />
              </Col>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
