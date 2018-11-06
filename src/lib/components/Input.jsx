import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx';
import './Input.css';

export default class Input extends React.Component {
  onChange(event) {
    this.props.onInputChange(event.target.value, this.props.inputOption);
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.triggerInputEnd()
      return false;
    }
  }

  render() {
    const size = Math.max(this.props.value.length, 1);
    return (
      <React.Fragment>
        <div className="search-bar__input-tag">
          { getInputDisplayName(this.props.inputOption) }
        </div>
        <input type="text"
                autoFocus={this.props.active}
                className="search-bar__input"
                value={this.props.value}
                size={size}
                onChange={this.onChange.bind(this)}
                onKeyPress={this.onKeyPress.bind(this)}/>
      </React.Fragment>
    )
  }
}

Input.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  triggerInputEnd: PropTypes.func.isRequired,
  inputOption: PropTypes.instanceOf(Object).isRequired,
  active: PropTypes.bool,
  value: PropTypes.string
}