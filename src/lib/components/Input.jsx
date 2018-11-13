import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx';
import './Input.css';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.textInputRef = null;
    this.triggerInputStart = this.triggerInputStart.bind(this);
  }

  componentDidMount() {
    if(this.props.value.length === 0){
      this.triggerInputStart();
    }
  }

  shouldComponentUpdate(prevProps) {
    return (
      prevProps.value !== this.props.value
    )
  }

  onChange(event) {
    this.props.onInputChange(event.target.value, this.props.inputOption);
  }

  onKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.triggerInputEnd()
    } else if (event.key === 'Backspace') {
      if (this.props.value.length === 0) {
        this.props.triggerInputEnd()
      }
    }
  }

  setTextInputRef(element) {
    this.textInputRef = element;
  }

  triggerInputStart() {
    if(this.textInputRef) {
      this.textInputRef.focus();
    }
  }

  render() {
    const size = Math.max(this.props.value.length, 1);
    return (
      <div className="search-bar__input-tag">
        <span>
          { getInputDisplayName(this.props.inputOption) }
        </span>
        <input type="text"
                value={this.props.value}
                size={size}
                onChange={this.onChange.bind(this)}
                onKeyDown={this.onKeyPress.bind(this)}
                ref={this.setTextInputRef.bind(this)}/>
      </div>
    )
  }
}

Input.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  triggerInputEnd: PropTypes.func.isRequired,
  inputOption: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.string
}