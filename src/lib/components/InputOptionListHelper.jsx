import React from 'react';
import PropTypes from 'prop-types';
import InputOptionList from './InputOptionList.jsx'
import './InputOptionListHelper.css';

export default class InputOptionListHelper extends React.Component {
  handleOptionSelect(optionSelect) {
    this.props.handleOptionSelect(optionSelect, this.props.value);
    this.props.changeHelperDisplay(false);
  }

  render() {
    return (
      <div className="search-bar__input-options-list-helper">
        <div className="search-bar__input-options-list-helper-backdrop"
             onClick={this.props.changeHelperDisplay.bind(this, false)}/>
        <div className="search-bar__input-options-list-helper-modal">
          <h3>{this.props.helperTitle}</h3>
          <InputOptionList onOptionSelect={this.handleOptionSelect.bind(this)}
                           currentSearchingKey=""
                           changeSearchIndexSelected={this.props.changeSearchIndexSelected}
                           selectedOption={this.props.selectedOption}
                           positionAbsolute={false}>
            { this.props.children }
          </InputOptionList>
          <button onClick={this.props.changeHelperDisplay.bind(this, false)}>{this.props.helperTextButton}</button>
        </div>
      </div>
    )
  }
}

InputOptionListHelper.propTypes = {
  helperTitle: PropTypes.string,
  helperTextButton: PropTypes.string
}