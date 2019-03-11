import React from 'react';

import PropTypes from 'prop-types';
import InputOptionList from './InputOptionList.jsx';
import './InputOptionListHelper.css';

export default class InputOptionListHelper extends React.Component {
  constructor (props) {
    super(props);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onArrowUp = this.onArrowUp.bind(this);
    this.onArrowDown = this.onArrowDown.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onBackspace = this.onBackspace.bind(this);
    this.redraw = this.redraw.bind(this);
  }

  handleOptionSelect (optionSelect) {
    this.props.handleOptionSelect(optionSelect, this.props.value);
    this.props.changeHelperDisplay(false);
  }

  onKeyPress (event) {
    switch (event.key) {
      case 'ArrowUp':
        this.onArrowUp();
        break;
      case 'ArrowDown':
        this.onArrowDown();
        break;
      case 'Enter':
        this.onEnter(event);
        break;
      case 'Tab':
        this.onEnter(event);
        break;
      case 'Backspace':
        this.onBackspace();
        break;
      case 'Escape':
        this.props.changeHelperDisplay(false);
        break;
    }
  }

  redraw (value) {
    const modal = document.getElementsByClassName('search-bar__input-options-list-helper-modal')[0];
    const list = document.getElementsByClassName('search-bar__input-options-list ')[0];
    const selected = list.children[0].children[value];

    if (!modal || !list || !selected) return;

    if (selected.offsetTop >= modal.offsetTop + modal.offsetHeight) {
      modal.scroll({ top: selected.offsetTop - 10, behavior: 'smooth' });
    } else if (selected.getBoundingClientRect().y <= modal.getBoundingClientRect().y) {
      modal.scroll({ top: selected.getBoundingClientRect().y - 10, behavior: 'smooth' });
    }
  }

  onArrowUp () {
    const value = Math.max(0, this.props.selectedOption - 1);
    this.redraw(value);
    this.props.changeSearchIndexSelected(value);
  }

  onArrowDown () {
    const children = React.Children.toArray(this.props.children);
    const value = Math.min(children.length - 1, this.props.selectedOption + 1);
    this.redraw(value);
    this.props.changeSearchIndexSelected(value);
  }

  onEnter (event) {
    event.preventDefault();
    let options = React.Children.toArray(this.props.children);
    if (this.props.selectedOption == null) return;
    if (options.length === 0) {
      this.props.changeHelperDisplay(true);
    } else {
      this.handleOptionSelect(options[this.props.selectedOption]);
    }
  }

  onBackspace () {
    if (this.props.value.length === 0) {
      this.props.handleOptionDelete();
    }
  }

  componentDidMount () {
    this.ref.focus();
    window.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  render () {
    return (
      <div className='search-bar__input-options-list-helper'>
        <div className='search-bar__input-options-list-helper-backdrop'
          onClick={() => this.props.changeHelperDisplay(false)} />
        <div className='search-bar__input-options-list-helper-modal' tabIndex='0' ref={ref => { this.ref = ref; }}>
          <h3>{this.props.helperTitle}</h3>
          <InputOptionList onOptionSelect={this.handleOptionSelect}
            currentSearchingKey=''
            changeSearchIndexSelected={this.props.changeSearchIndexSelected}
            selectedOption={this.props.selectedOption}
            positionAbsolute={false}>
            { this.props.children }
          </InputOptionList>
          <button onClick={() => this.props.changeHelperDisplay(false)}>{this.props.helperTextButton}</button>
        </div>
      </div>
    );
  }
}

InputOptionListHelper.propTypes = {
  handleOptionDelete: PropTypes.func.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
  changeHelperDisplay: PropTypes.func.isRequired,
  changeSearchIndexSelected: PropTypes.func,
  selectedOption: PropTypes.number,
  helperTitle: PropTypes.string,
  helperTextButton: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node
};
