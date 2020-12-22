import React from 'react';
import {ChromePicker} from 'react-color';
import '../Assets/style/ColorPicker.css';
import {Button, Tooltip} from 'reactstrap';
import propTypes from 'prop-types';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: '#ffffff',
      borderColor: 'secondary',
      tooltipOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      color: this.props.value ? this.props.value : '#ffffff',
      tooltipOpen: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      if (this.props.value !== this.state.color) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          color: this.props.value,
        });
      }
    } else if (prevState.color !== this.state.color) {
      if (this.props.value !== this.state.color) {
        // eslint-disable-next-line react/no-did-update-set-state
        if (this.props.value !== this.state.color) {
          this.props.setValues(this.props.name, this.state.color);
        }
      }
    }
    if (
      // eslint-disable-next-line react/prop-types
      prevProps.error !== this.props.error ||
      // eslint-disable-next-line react/prop-types
      prevProps.touched !== this.props.touched
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        borderColor:
          // eslint-disable-next-line react/prop-types
          this.props.error && this.props.touched ? 'danger' : 'secondary',
      });
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      displayColorPicker: !prevState.displayColorPicker,
    }));
  };

  handleClose = () => {
    this.setState({displayColorPicker: false});
  };

  handleChange = (color) => {
    this.setState({color: color.hex});
  };

  render() {
    return (
      <div className="position-relative">
        <Button
          id={this.props.id}
          color={this.state.borderColor}
          outline
          type="button"
          className="swatch"
          onClick={this.handleClick}>
          <div className="color" style={{backgroundColor: this.state.color}} />
        </Button>

        {/* eslint-disable-next-line react/prop-types */}
        {this.props.error && this.props.touched ? (
          <Tooltip
            isOpen={this.state.tooltipOpen}
            placement="bottom"
            target={this.props.id}>
            {/* eslint-disable-next-line react/prop-types */}
            {this.props.err.detailArr[this.props.index].hex}
          </Tooltip>
        ) : null}
        {this.state.displayColorPicker ? (
          <div className="popover">
            <ChromePicker
              disableAlpha
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  setValues: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};

export default ColorPicker;
