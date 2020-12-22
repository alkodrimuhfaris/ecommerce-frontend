import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  CustomInput,
  Tooltip,
} from 'reactstrap';
import propTypes from 'prop-types';
import {Formik, Field, FieldArray, getIn} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import qs from 'qs';
import {AiFillCloseCircle} from 'react-icons/ai';
import adminAction from '../../redux/actions/admin';
import categoryAction from '../../redux/actions/category';
import ModalLoading from '../ModalLoading';
import ColorPicker from '../ColorPicker';
import '../../Assets/style/Form.css';
import ModalConfirm from '../ModalConfirm';
import placeholderImage from '../../Assets/images/TukuIcon.png';

const schemaItem = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required!')
    .min(2, 'Product name is too short'),
  price: Yup.number()
    .min(1, 'Price Cannot be zero!')
    .required('Price is required!'),
  stock: Yup.number().required('Stock is required!'),
  categoryName: Yup.string().required('Category is required!'),
  description: Yup.string().required('Description is required!'),
  weight: Yup.number()
    .min(1, 'Weight cannot be zero!')
    .required('Weight is required!'),
  condition_id: Yup.number().required("Insert your item's condition!"),
  detailArr: Yup.array().of(
    Yup.object().shape({
      colorName: Yup.string()
        .required('Color name is required!')
        .min(2, 'Color name is too short'),
      hex: Yup.string()
        .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i, 'Input valid hex!')
        .required('Color hex is required!'),
      available: Yup.boolean().required(
        'Specify wether your item is available or not!',
      ),
    }),
  ),
});

class ModalUpdate extends React.Component {
  // creating object for item detail
  itemDetailObj = {
    id: 0,
    colorName: '',
    hex: '',
    available: true,
  };

  selectStyle = {
    control: (provided, state) => ({
      ...provided,
      // eslint-disable-next-line no-nested-ternary
      borderColor: state.selectProps.error
        ? '#dc3545'
        : state.selectProps.touched
        ? '#5cb85c'
        : 'rgba(0,0,0,.2)',
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      popUpMsg: '',
      categoryOpt: [],
      colorOpt: [],
      conditionOpt: [],
      conditionSelected: {},
      item: {},
      itemDetails: [{...this.itemDetailObj}],
      category: {},
      image: [
        {
          product_image: '',
          name: '',
          file: {},
        },
        {
          product_image: '',
          name: '',
          file: {},
        },
        {
          product_image: '',
          name: '',
          file: {},
        },
        {
          product_image: '',
          name: '',
          file: {},
        },
      ],
      availableTest: true,
      imageTest: true,
      arrayHelpers: [],
      indexSelected: null,
      modalDelete: false,
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getAllColors();
    this.props.getCondition(this.props.auth.token);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.categories !== this.props.categories) {
      const categoryOpt = this.props.categories.map((item) => {
        item = {
          value: item.name,
          label: item.name,
          id: item.id,
        };
        return item;
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        categoryOpt,
      });
      console.log('update cateogriesOpt');
    }
    if (previousProps.colors !== this.props.colors) {
      const colorOpt = this.props.colors.map((item) => {
        item = {
          value: item.name,
          label: item.name,
          id: item.id,
          hex: item.hex,
        };
        return item;
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        colorOpt,
      });
      console.log('update colorOpt');
    }
    if (previousProps.condition !== this.props.condition) {
      const conditionOpt = this.props.condition.map((item) => {
        item = {
          value: item.id,
          label: item.item_condition,
        };
        return item;
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        conditionOpt,
      });
      console.log('update colorOpt');
    }
    if (previousProps.itemData !== this.props.itemData) {
      // eslint-disable-next-line prefer-const
      let {item, category, itemDetails} = this.props.itemData;

      // update state image
      const image = [];
      Object.entries(item).forEach((itmDetail) => {
        const [key, val] = itmDetail;
        let test = false;
        [
          'product_image_1',
          'product_image_2',
          'product_image_3',
          'product_image_4',
        ].forEach((imgName) => {
          test = imgName === key;
        });
        if (test) {
          image.push({
            product_image: `${process.env.REACT_APP_URL_BACKEND}/${val}`,
            name: key,
            file: {},
          });
        }
      });

      // update item detail
      itemDetails = itemDetails.length
        ? itemDetails.map((det) => ({
            id: det.id,
            colorName: det.name,
            hex: det.hex,
          }))
        : [];
      category = {
        value: category.name,
        label: category.name,
      };

      // update item condition default
      let conditionSelected = {};
      this.state.conditionOpt.forEach((cond) => {
        if (item.condition_id === cond.value) {
          conditionSelected = {
            value: cond.value,
            label: cond.label,
          };
        }
      });

      // set up state
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        image,
        itemDetails,
        category,
        conditionSelected,
      });
    }
    if (
      previousProps.adminUpdate.updateItemPending !==
      this.props.adminUpdate.updateItemPending
    ) {
      if (this.props.adminUpdate.updateItemSuccess) {
        // eslint-disable-next-line no-alert
        // eslint-disable-next-line no-undef
        alert('success update item!');
        this.props.getThisItem(this.props.auth.token, this.props.item_id);
        this.props.getAdminItems(this.props.auth.token, this.props.query);
      }
    }
    if (
      previousProps.adminDelete.deleteItemDetailPending !==
      this.props.adminDelete.deleteItemDetailPending
    ) {
      if (this.props.admin.deleteItemDetailSuccess) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          modalDelete: false,
        });
        // eslint-disable-next-line no-undef
        alert('success delete item detail!');
      }
    }
    if (
      previousProps.adminDelete.deleteItemDetailPending !==
      this.props.adminDelete.deleteItemDetailPending
    ) {
      if (this.props.admin.deleteItemDetailSuccess) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          modalDelete: false,
        });
        // eslint-disable-next-line no-undef
        alert('success delete item detail!');
      }
    }
  }

  // delete item image

  openDeleteImage = (index) => {
    this.setState({
      imgDel: true,
      imgDelIndx: index,
    });
  };

  handleDeleteImage = () => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const image = [...this.state.image];
    this.props.deleteImage(this.props.item_id, this.state.imgDelIndx + 1);
    image[this.state.imgDelIndx] = {
      product_image: '',
      name: '',
      file: {},
    };
    this.props.deleteImage(this.props.item_id, this.state.imgDelIndx + 1);
    this.setState({image, imgDel: false});
    // eslint-disable-next-line no-alert
    // eslint-disable-next-line no-undef
    alert('Image deleted!');
  };

  closeDeleteImage = () => {
    this.setState({
      imgDel: false,
    });
  };

  // delete item details

  deleteDetail = () => {
    this.props.deleteItemDetail(this.props.item_id, this.state.indexSelected);
    this.state.arrayHelpers.remove(this.state.indexSelected);
    this.setState({
      modalDelete: false,
    });
  };

  openDelDetailModal = (index, arrayHelpers) => {
    this.setState({
      arrayHelpers,
      indexSelected: index,
      modalDelete: true,
    });
  };

  closeDelDetailModal = () => {
    this.setState({
      modalDelete: false,
    });
  };

  // change color handle

  handleChangeColor = (val, index, setValue) => {
    const {id, hex} = val;
    setValue(`detailArr[${index}].colorName`, val.value);
    if (id && hex) {
      setValue(`detailArr[${index}].hex`, hex);
    } else {
      setValue(`detailArr[${index}].hex`, '');
    }
  };

  // handling update item

  handleUpdate = (values) => {
    const val = {...values};
    let imageTest = true;
    imageTest = !!this.state.image[0].product_image;
    this.setState({
      imageTest,
    });
    console.log(imageTest);
    let availableTest = true;
    values.detailArr.forEach((item) => {
      availableTest = item.available;
    });
    this.setState({
      availableTest,
    });
    console.log(availableTest);
    console.log(values);
    if (imageTest && availableTest) {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      // eslint-disable-next-line no-restricted-syntax
      for (const image of this.state.image) {
        if (Object.keys(image.file).length) {
          // eslint-disable-next-line no-await-in-loop
          data.append('product_image[]', image.file);
        }
      }
      const detailArr = val.detailArr.length
        ? qs.stringify({detailArr: [...val.detailArr]})
        : undefined;
      Object.assign(val, {detailArr});
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(val)) {
        data.append(key, value);
      }
      this.props.updateItem(this.props.auth.token, data);
    }
  };

  // close modal update

  handleClose = (event) => {
    event.preventDefault();
    this.props.modalCloseUpdate('updt');
  };

  onImageChange = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      const image = [...this.state.image];
      const [file] = event.target.files;
      if (file.size > 500 * 1024) {
        // eslint-disable-next-line no-undef
        alert('file should be less than 500 kB!');
      } else {
        image[index] = {
          product_image: URL.createObjectURL(file),
          name: file.name,
          file,
        };
        console.log(event.target.value);
        console.log(file);
        const imageTest = index === 0 ? true : this.state.imageTest;
        this.setState((prevState) => ({
          ...prevState,
          imageTest,
          image,
        }));
      }
    }
  };

  optionChange = (e, setValue, name) => {
    setValue(name, e.value);
  };

  render() {
    const {item, itemDetails, conditionSelected, category} = this.state;
    return (
      <>
        {/* modal for post new */}
        <Modal
          isOpen={this.props.modalOpenUpdate}
          size="lg"
          style={{maxWidth: '1600px', width: '80%'}}>
          <ModalHeader>{item.name}</ModalHeader>
          <ModalBody>
            {/* eslint-disable-next-line react/prop-types */}
            <Formik
              initialValues={{
                name: item.name ? item.name : '',
                price: item.price ? item.price : 0,
                stock: item.stock ? item.stock : 0,
                categoryName: category.value ? category.value : '',
                description: item.description ? item.description : '',
                weight: item.weight ? item.weight : '',
                condition_id: conditionSelected.value
                  ? conditionSelected.value
                  : 0,
                detailArr: [...itemDetails],
              }}
              validationSchema={schemaItem}
              validateOnBlur
              onSubmit={(values) => {
                this.handleAdd(values);
              }}>
              {(props) => {
                const {
                  touched,
                  errors,
                  handleSubmit,
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                } = props;

                return (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="name">Item&apos;s name</Label>
                      <Input
                        tag={Field}
                        type="text"
                        name="name"
                        id="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.name && touched.name}
                        invalid={errors.name}
                      />
                      {errors.name || touched.name ? (
                        <FormFeedback invalid>{errors.name}</FormFeedback>
                      ) : null}
                    </FormGroup>
                    <Row>
                      <Col xs={6} md={8}>
                        <FormGroup>
                          <Label for="categoryName">Category</Label>
                          <CreatableSelect
                            tag={Field}
                            id="categoryName"
                            styles={this.selectStyle}
                            error={errors.categoryName}
                            touched={values.categoryName}
                            onChange={(e) => {
                              this.optionChange(
                                e,
                                setFieldValue,
                                'categoryName',
                              );
                            }}
                            options={this.state.categoryOpt}
                          />
                          {errors.categoryName || touched.categoryName ? (
                            <text className="error-form">
                              {errors.categoryName}
                            </text>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col xs={6} md={4}>
                        <FormGroup>
                          <Label for="condition_id">Condition</Label>
                          <Select
                            tag={Field}
                            id="condition_id"
                            styles={this.selectStyle}
                            error={errors.condition_id}
                            touched={values.condition_id}
                            onChange={(e) => {
                              this.optionChange(
                                e,
                                setFieldValue,
                                'condition_id',
                              );
                            }}
                            options={this.state.conditionOpt}
                          />
                          {errors.condition_id || touched.condition_id ? (
                            <text className="error-form">
                              {errors.condition_id}
                            </text>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Label for="price">Price</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          Rp
                        </InputGroupAddon>
                        <Input
                          tag={Field}
                          type="number"
                          name="price"
                          id="price"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={!errors.price && touched.price}
                          invalid={errors.price}
                        />
                        <InputGroupAddon addonType="append">
                          .00
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.price || touched.price ? (
                        <text className="error-form">{errors.price}</text>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for="stock">Stock</Label>
                      <Input
                        tag={Field}
                        type="number"
                        name="stock"
                        id="stock"
                        value={values.stock}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.stock && touched.stock}
                        invalid={errors.stock}
                      />
                      {errors.stock || touched.stock ? (
                        <FormFeedback invalid>{errors.stock}</FormFeedback>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for="weight">Weight</Label>
                      <InputGroup>
                        <Input
                          tag={Field}
                          type="number"
                          name="weight"
                          id="weight"
                          value={values.weight}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          valid={!errors.weight && touched.weight}
                          invalid={errors.weight}
                        />
                        <InputGroupAddon addonType="append">
                          gram
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.weight || touched.weight ? (
                        <text className="error-form">{errors.weight}</text>
                      ) : null}
                    </FormGroup>
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        aria-multiline
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        valid={!errors.description && touched.description}
                        invalid={errors.description}
                      />
                      {errors.description || touched.description ? (
                        <FormFeedback invalid>
                          {errors.description}
                        </FormFeedback>
                      ) : null}
                    </FormGroup>

                    {/* add images */}
                    <div className="row">
                      {this.state.image.map((image, index) => (
                        <div className="p-3 col-6">
                          <div
                            className="card p-3"
                            id={`photo-${index}`}
                            style={
                              !this.state.imageTest && index === 0
                                ? {borderColor: '#dc3545'}
                                : {borderColor: 'rgba(0,0,0,.2)'}
                            }>
                            <div className="d-flex justify-content-center">
                              <text className="m-3 text-center">
                                {index === 0
                                  ? 'Main Image'
                                  : `Product Image ${index + 1}`}
                              </text>
                            </div>
                            <div className="position-relative image-wrapper">
                              {Object.keys(
                                this.state.image[index].product_image,
                              ).length ? (
                                <button
                                  type="button"
                                  onClick={() => this.openDeleteImage(index)}
                                  className="btn close-btn">
                                  <AiFillCloseCircle color="white" size="1em" />
                                </button>
                              ) : null}
                              <ModalConfirm
                                modalOpen={this.state.imgDel}
                                close={this.closeDeleteImage}
                                confirm={this.handleDeleteImage}
                              />
                              <img
                                className="position-absolute img-fluid center-img"
                                src={
                                  item.product_image
                                    ? item.product_image
                                    : placeholderImage
                                }
                                alt={`${
                                  Object.keys(item.product_image)[0]
                                }_${index}`}
                              />
                            </div>
                            <label
                              htmlFor={`product_image_${index + 1}`}
                              className="btn btn-outline-secondary rounded-pill">
                              <span>Select File</span>
                              <input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                id={`product_image_${index + 1}`}
                                name={`product_image_${index + 1}`}
                                onChange={(e) => this.onImageChange(e, index)}
                                style={{display: 'none'}}
                              />
                            </label>
                          </div>
                          {!this.state.imageTest && index === 0 ? (
                            <Tooltip
                              isOpen={!this.state.imageTest && index === 0}
                              placement="bottom"
                              target={`photo-${index}`}>
                              {/* eslint-disable-next-line react/prop-types */}
                              Main image should not be empty!
                            </Tooltip>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    {/* add item details */}
                    <FieldArray
                      name="detailArr"
                      render={(arrayHelpers) => (
                        <div>
                          {values &&
                          values.detailArr &&
                          values.detailArr.length > 0 ? (
                            <div>
                              <div id="item-detail">
                                {values.detailArr.map((detailArr, index) => (
                                  <div key={index}>
                                    <Row form>
                                      <Col md={4} xs={4}>
                                        <FormGroup>
                                          <Label
                                            for={`detailArr.${index}.colorName`}>
                                            Color Name
                                          </Label>
                                          <CreatableSelect
                                            tag={Field}
                                            id={`detailArr[${index}].colorName`}
                                            styles={this.selectStyle}
                                            error={getIn(
                                              errors,
                                              `detailArr[${index}].colorName`,
                                            )}
                                            touched={getIn(
                                              touched,
                                              `detailArr[${index}].colorName`,
                                            )}
                                            onChange={(e) => {
                                              this.handleChangeColor(
                                                e,
                                                index,
                                                setFieldValue,
                                              );
                                            }}
                                            options={this.state.colorOpt}
                                          />
                                          {getIn(
                                            errors,
                                            `detailArr[${index}].colorName`,
                                          ) ? (
                                            <text className="error-form">
                                              {
                                                errors.detailArr[index]
                                                  .colorName
                                              }
                                            </text>
                                          ) : null}
                                        </FormGroup>
                                      </Col>
                                      <Col md={2} xs={1}>
                                        <FormGroup>
                                          <Label for={`detailArr${index}hex`}>
                                            Hex
                                          </Label>
                                          <ColorPicker
                                            id={`tooltip-${index}-hex`}
                                            setValues={setFieldValue}
                                            name={`detailArr[${index}].hex`}
                                            value={values.detailArr[index].hex}
                                            error={getIn(
                                              errors,
                                              `detailArr[${index}].hex`,
                                            )}
                                            touched={getIn(
                                              touched,
                                              `detailArr[${index}].hex`,
                                            )}
                                            err={errors}
                                            index={index}
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={3} xs={3}>
                                        <FormGroup>
                                          <Label
                                            for={`detailArr.${index}.available`}>
                                            {values.detailArr[index].available
                                              ? 'Available'
                                              : 'Unavailable'}
                                          </Label>
                                          <CustomInput
                                            type="switch"
                                            tag={Field}
                                            id={`detailArr.${index}.available`}
                                            name={`detailArr[${index}].available`}
                                            checked={
                                              values.detailArr[index].available
                                            }
                                            onChange={handleChange}
                                          />
                                        </FormGroup>
                                      </Col>
                                      {values.detailArr.length > 1 ? (
                                        <Col md={2} xs={2}>
                                          <FormGroup>
                                            <Label>Action</Label>
                                            <Button
                                              className="rounded-pill"
                                              color="danger"
                                              type="button"
                                              onClick={() =>
                                                this.openDeleteDetail(
                                                  index,
                                                  arrayHelpers,
                                                )
                                              } // remove a friend from the list
                                            >
                                              Remove
                                            </Button>
                                          </FormGroup>
                                          <ModalConfirm
                                            modalOpen={this.state.modalDelete}
                                            confirm={this.deleteDetail}
                                            close={this.closeDetailModal}
                                          />
                                        </Col>
                                      ) : null}
                                    </Row>
                                  </div>
                                ))}
                                <Button
                                  color="success"
                                  outline
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      ...this.itemDetailObj,
                                    })
                                  }>
                                  {/* show this when user has removed all friends from the list */}
                                  Add a color
                                </Button>
                              </div>
                              <Tooltip
                                isOpen={!this.state.availableTest}
                                placement="top"
                                target="item-detail">
                                {/* eslint-disable-next-line react/prop-types */}
                                At least one should be available!
                              </Tooltip>
                            </div>
                          ) : (
                            <Button
                              color="success"
                              outline
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  ...this.itemDetailObj,
                                })
                              }>
                              {/* show this when user has removed all friends from the list */}
                              Add a color
                            </Button>
                          )}
                        </div>
                      )}
                    />
                    <div className="d-flex justify-content-center">
                      <Button
                        color="success"
                        type="submit"
                        className="rounded-pill">
                        Submit
                      </Button>
                      <ModalLoading
                        modalOpen={this.props.adminUpdate.updateItemPending}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={this.handleClose}
              className="rounded-pill">
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

ModalUpdate.propTypes = {
  itemData: propTypes.objectOf(propTypes.object).isRequired,
  item_id: propTypes.number.isRequired,
  categories: propTypes.objectOf(propTypes.object).isRequired,
  colors: propTypes.objectOf(propTypes.object).isRequired,
  modalOpenUpdate: propTypes.bool.isRequired,
  modalCloseUpdate: propTypes.func.isRequired,
  getCategories: propTypes.func.isRequired,
  getAllColors: propTypes.func.isRequired,
  getCondition: propTypes.func.isRequired,
  deleteImage: propTypes.func.isRequired,
  deleteItemDetail: propTypes.func.isRequired,
  updateItem: propTypes.func.isRequired,
  getThisItem: propTypes.func.isRequired,
  getAdminItems: propTypes.func.isRequired,
  admin: propTypes.objectOf(propTypes.object).isRequired,
  condition: propTypes.objectOf(propTypes.object).isRequired,
  auth: propTypes.objectOf(propTypes.object).isRequired,
  adminDelete: propTypes.objectOf(propTypes.object).isRequired,
  adminUpdate: propTypes.objectOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  query: state.admin.query,
  categories: state.category.allCategories,
  colors: state.admin.colors,
  condition: state.admin.condition,
  itemData: state.admin.itemData,
  adminDelete: state.adminDelete,
  adminUpdate: state.adminUpdate,
});

const mapDispatchToProps = {
  updateItem: adminAction.updateItem,
  getAllColors: adminAction.getAllColors,
  getCategories: categoryAction.getCategories,
  getCondition: adminAction.getCondition,
  getAllItem: adminAction.getAdminItems,
  getThisItem: adminAction.getItemDetails,
  deleteImage: adminAction.deleteImage,
  deleteItemDetail: adminAction.deleteDetailItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdate);
