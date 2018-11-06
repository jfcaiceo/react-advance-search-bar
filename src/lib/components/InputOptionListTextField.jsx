
import React from 'react';
import PropTypes from 'prop-types';
import './InputOptionListTextField.css'

export default class InputOptionListTextField extends React.Component {
  constructor(props) {
    super(props);
  }

  changeFocus(value) {
    this.props.focusChangeHandler(value);
  }

  render() {
    return (
      <input type="text"
              className="search-bar__input-options-list-text-field"
              onFocus={this.changeFocus.bind(this, true)}
              onBlur={this.changeFocus.bind(this, false)}
              value={this.props.value}
              onChange={this.props.onChange.bind(this)}
              ref={this.props.refInput}/>
    )
  }
}

InputOptionListTextField.propTypes = {
  focusChangeHandler: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  refInput: PropTypes.func
}


