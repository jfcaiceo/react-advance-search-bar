import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx';
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
          <span className='input-tag__delete' onClick={this.onDelete}>
            <svg className='input-tag-delete__icon' xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' /></svg>
          </span>
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
