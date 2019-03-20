import React from 'react';
import PropTypes from 'prop-types';
import InputOptionList from './InputOptionList.jsx';
import InputOptionListTextField from './InputOptionListTextField.jsx';
import InputOptionListHelper from './InputOptionListHelper.jsx';
import Input from './Input.jsx';
import './AdvanceSearchBar.css';

export default class AdvanceSearchBar extends React.Component {
  constructor (props) {
    super(props);
    this.getCurrentTags = this.getCurrentTags.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.getCurrentInputOptionList = this.getCurrentInputOptionList.bind(this);
    this.handleInputEnd = this.handleInputEnd.bind(this);
    this.isSearchValid = this.isSearchValid.bind(this);
    this.handleOptionTextChange = this.handleOptionTextChange.bind(this);
    this.triggerInputEnd = this.triggerInputEnd.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.changeSearchIndexSelected = this.changeSearchIndexSelected.bind(this);
    this.handleOptionDelete = this.handleOptionDelete.bind(this);
    this.changeHelperDisplay = this.changeHelperDisplay.bind(this);
    this.triggerSearch = this.triggerSearch.bind(this);
    this.handleClean = this.handleClean.bind(this);
    this.setTextInputRef = this.setTextInputRef.bind(this);
    this.showHelper = this.showHelper.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.textInputRef = null;
    this.state = {
      focus: false,
      // Searching
      searchingInput: false,
      searchInputValue: '',
      searchIndexSelected: 0,
      // Healper
      showHelper: false,
      // Options
      selectedOptions: {}
    };
  }

  changeFocus (value) {
    let hasValue = !!this.state.searchInputValue;
    let hasOptions = Object.keys(this.state.selectedOptions).length > 0;
    this.setState({
      focus: (hasValue || hasOptions || value),
      isSearching: (hasValue || value)
    });
    if (value && hasOptions) {
      this.handleInputEnd();
    }
  }

  handleInputTextChange (event) {
    this.setState({
      searchInputValue: event.target.value,
      searchIndexSelected: 0
    });
  }

  handleOptionTextChange (value, inputOption) {
    let selectedOptionsCopy = this.state.selectedOptions;
    selectedOptionsCopy[inputOption.props.name] = value;

    this.setState({
      selectedOptions: selectedOptionsCopy
    });
  }

  changeSearchIndexSelected (value) {
    if (this.state.value === value) return false;

    this.setState({
      searchIndexSelected: value
    });
  }

  changeHelperDisplay (value) {
    this.setState({
      showHelper: value,
      searchIndexSelected: 0
    });
    if (!value) {
      setTimeout(() => { this.triggerInputEnd(); }, 200);
    }
  }

  handleOptionSelect (selectedOption, value) {
    if (!selectedOption) {
      return;
    }
    let selectedOptionsCopy = this.state.selectedOptions;
    selectedOptionsCopy[selectedOption.props.name] = value || '';

    this.setState({
      searchInputValue: '',
      searchIndexSelected: 0,
      selectedOptions: selectedOptionsCopy
    });
  }

  handleOptionDelete () {
    let selectedOptions = this.state.selectedOptions;
    let keys = Object.keys(selectedOptions);
    if (keys.length === 0) {
      return;
    }
    delete selectedOptions[keys[keys.length - 1]];
    this.setState({
      selectedOptions: selectedOptions
    }, () => {
      const selectedOptions = Object.keys(this.state.selectedOptions);
      if (!selectedOptions.length) {
        this.triggerEmptyState();
      }
    });
  }

  handleInputEnd () {
    let selectedOptions = this.state.selectedOptions;
    for (let [key, value] of Object.entries(selectedOptions)) {
      if (!value) {
        delete selectedOptions[key];
      }
    }

    this.setState({
      selectedOptions: selectedOptions
    }, () => {
      const selectedOptions = Object.keys(this.state.selectedOptions);
      if (!selectedOptions.length) {
        this.triggerEmptyState();
      }
    });
  }

  handleClean () {
    this.setState({
      selectedOptions: {},
      searchInputValue: ''
    }, () => { this.triggerEmptyState(); });
  }

  setTextInputRef (element) {
    this.textInputRef = element;
  }

  triggerInputEnd () {
    if (this.textInputRef) {
      this.textInputRef.focus();
    }
  }

  triggerSearch () {
    this.props.callback(this.state.selectedOptions);
  }

  triggerEmptyState () {
    this.props.emptyCallback();
  }

  getCurrentTags (optionList) {
    let inputs = [];

    for (let [key, value] of Object.entries(this.state.selectedOptions)) {
      let inputOption = React.Children.toArray(this.props.children).find(({ props }) => props.name === key);
      inputs.push(
        <Input onInputChange={this.handleOptionTextChange}
          triggerInputEnd={this.triggerInputEnd}
          inputOption={inputOption}
          value={value}
          key={key} />
      );
    }
    inputs.push(
      <InputOptionListTextField focusChangeHandler={this.changeFocus}
        value={this.state.searchInputValue}
        disabled={this.state.showHelper}
        onChange={this.handleInputTextChange}
        onOptionSelect={this.handleOptionSelect}
        selectedOption={this.state.searchIndexSelected}
        changeSearchIndexSelected={this.changeSearchIndexSelected}
        handleOptionDelete={this.handleOptionDelete}
        changeHelperDisplay={this.changeHelperDisplay}
        refInput={this.setTextInputRef}
        key='search-bar-input-text'>
        { optionList }
      </InputOptionListTextField>
    );

    if (inputs.length > 1 || this.state.searchInputValue.length >= 1) {
      inputs.push(
        <div className='search-bar__clean'onClick={this.handleClean} key='search-bar-clean'>
          <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24'><path fill='none' d='M0 0h24v24H0V0z' /><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' /></svg>
        </div>
      );
    }

    return inputs;
  }

  getCurrentInputOptionList () {
    let children = React.Children.toArray(this.props.children);
    let allValues = children.map(child => child.props.name);
    let selectedValues = Object.keys(this.state.selectedOptions);

    for (let i = 0; i < selectedValues.length; i++) {
      let index;
      while ((index = allValues.indexOf(selectedValues[i])) !== -1) {
        allValues.splice(index, 1);
      }
    }

    return children.filter(child => allValues.indexOf(child.props.name) !== -1);
  }

  isSearchValid () {
    return Object.values(this.state.selectedOptions).some((value) => { return value.length > 0; });
  }

  showHelper () {
    return this.state.searchInputValue.length > 3;
  }

  handleSearchButton (showHeper) {
    if (showHeper) {
      this.changeHelperDisplay(true);
    } else {
      this.triggerSearch();
    }
  }

  render () {
    const searchValid = this.isSearchValid();
    const showHelper = this.showHelper();
    let optionList = this.getCurrentInputOptionList();
    let list;

    if (this.state.showHelper) {
      list = <InputOptionListHelper handleOptionSelect={this.handleOptionSelect}
        changeSearchIndexSelected={this.changeSearchIndexSelected}
        changeHelperDisplay={this.changeHelperDisplay}
        value={this.state.searchInputValue}
        selectedOption={this.state.searchIndexSelected}
        helperTitleFunction={this.props.helperTitleFunction}
        helperTextButton={this.props.helperTextButton}>
        { optionList }
      </InputOptionListHelper>;
    } else if (this.state.isSearching) {
      list = <InputOptionList onOptionSelect={this.handleOptionSelect}
        currentSearchingKey={this.state.searchInputValue}
        changeSearchIndexSelected={this.changeSearchIndexSelected}
        selectedOption={this.state.searchIndexSelected}
        notTagFound={this.props.notTagFound}>
        { optionList }
      </InputOptionList>;
    }
    return (
      <div className='search-bar'>
        <div className={`search-bar__container ${this.state.focus ? 'search-bar__container--focus' : ''}`}>
          { this.getCurrentTags(optionList) }
        </div>
        <button className={`search-bar__button ${searchValid || showHelper ? 'search-bar__button--active' : ''} ${this.state.focus ? 'search-bar__button--active-border' : ''}`}
          disabled={!searchValid && !showHelper}
          onClick={() => this.handleSearchButton(showHelper)}>{this.props.buttonText}</button>
        { this.props.labelText && <label className={`search-bar__label ${this.state.focus ? 'search-bar__label--float' : ''}`}>{this.props.labelText}</label> }
        { list }
      </div>
    );
  }
}

AdvanceSearchBar.propTypes = {
  callback: PropTypes.func.isRequired,
  emptyCallback: PropTypes.func,
  helperTitleFunction: PropTypes.func,
  children: PropTypes.node.isRequired,
  labelText: PropTypes.string,
  buttonText: PropTypes.string,
  notTagFound: PropTypes.string,
  helperTextButton: PropTypes.string
};

AdvanceSearchBar.defaultProps = {
  labelText: 'Advance Search',
  buttonText: 'Search',
  notTagFound: 'No tags matched',
  helperTextButton: 'Cancel',
  helperTitleFunction: (word) => (
    <div className='helper-title'>
      You have written: <span className='helper-title__word'>{word}</span>.<br />
      Please enter the field in which you are looking for
    </div>
  )
};
