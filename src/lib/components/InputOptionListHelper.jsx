import React from 'react';
import PropTypes from 'prop-types';
import InputOptionList from './InputOptionList.jsx';
import './InputOptionListHelper.css';

export default class InputOptionListHelper extends React.Component {
  constructor (props) {
    super(props);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
  }

  handleOptionSelect (optionSelect) {
    this.props.handleOptionSelect(optionSelect, this.props.value);
    this.props.changeHelperDisplay(false);
  }

  render () {
    return (
      <div className='search-bar__input-options-list-helper'>
        <div className='search-bar__input-options-list-helper-backdrop'
          onClick={() => this.props.changeHelperDisplay(false)} />
        <div className='search-bar__input-options-list-helper-modal'>
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
  handleOptionSelect: PropTypes.func.isRequired,
  changeHelperDisplay: PropTypes.func.isRequired,
  changeSearchIndexSelected: PropTypes.func,
  selectedOption: PropTypes.number,
  helperTitle: PropTypes.string,
  helperTextButton: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node
};
