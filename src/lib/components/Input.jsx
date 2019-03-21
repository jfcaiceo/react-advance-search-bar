import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx';
import DeleteIcon from './DeleteIcon.jsx';
import './Input.css';

export default class Input extends React.Component {
  constructor (props) {
    super(props);
    this.textInputRef = null;
    this.triggerInputStart = this.triggerInputStart.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount () {
    if (this.props.value.length === 0) {
      this.triggerInputStart();
    }
  }

  shouldComponentUpdate (prevProps) {
    return (
      prevProps.value !== this.props.value
    );
  }

  onChange (event) {
    this.props.onInputChange(event.target.value, this.props.inputOption);
  }

  onDelete () {
    this.props.onInputChange('', this.props.inputOption);
    this.props.triggerInputEnd();
  }

  onKeyPress (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.triggerInputEnd();
    } else if (event.key === 'Backspace') {
      if (this.props.value.length === 0) {
        this.props.triggerInputEnd();
      }
    }
  }

  setTextInputRef (element) {
    this.textInputRef = element;
  }

  triggerInputStart () {
    if (this.textInputRef) {
      this.textInputRef.focus();
    }
  }

  render () {
    const size = Math.max(this.props.value.length, 1);
    return (
      <div className='search-bar__input-tag'>
        <span className='input-tag__start'>
          { getInputDisplayName(this.props.inputOption) }
        </span>
        <span className='input-tag__second'>
          <input type='text'
            value={this.props.value}
            size={size}
            onChange={this.onChange}
            onKeyDown={this.onKeyPress}
            ref={this.setTextInputRef.bind(this)} />
          <DeleteIcon className='input-tag__delete' width='14' height='14' onClick={this.onDelete} />
        </span>
      </div>
    );
  }
}

Input.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  triggerInputEnd: PropTypes.func.isRequired,
  inputOption: PropTypes.instanceOf(Object).isRequired,
  value: PropTypes.string
};
