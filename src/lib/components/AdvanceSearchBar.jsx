import React from 'react';
import InputOptionList from './InputOptionList.jsx';
import InputOptionListTextField from './InputOptionListTextField.jsx';
import Input from './Input.jsx';
import './AdvanceSearchBar.css';

export default class AdvanceSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentTags = this.getCurrentTags.bind(this);
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.getCurrentInputOptionList = this.getCurrentInputOptionList.bind(this);
    this.handleInputEnd = this.handleInputEnd.bind(this);
    this.textInputRef = null;
    this.state = {
      focus: false,
      searchingInput: false,
      searchInputValue: '',
      searchIndexSelected: 0,
      currentSelectedOption: null,
      selectedOptions: {}
    };
  }

  changeFocus(value) {
    let hasValue = !!this.state.searchInputValue;
    let hasOptions = Object.keys(this.state.selectedOptions).length > 0;
    this.setState({
      focus: (hasValue || hasOptions || value),
      isSearching: true//(hasValue || value)
    });
    if(value && hasOptions) {
      this.handleInputEnd();
    }
  }

  handleInputTextChange(event) {
    this.setState({
      searchInputValue: event.target.value,
      searchIndexSelected: 0
    })
  }

  handleOptionTextChange(value, inputOption) {
    let selectedOptionsCopy = this.state.selectedOptions
    selectedOptionsCopy[inputOption.props.name] = value;

    this.setState({
      selectedOptions: selectedOptionsCopy
    })
  }

  changeSearchIndexSelected(value) {
    this.setState({
      searchIndexSelected: value
    })
  }

  handleOptionSelect(selectedOption) {
    if(!selectedOption) {
      return;
    }
    let selectedOptionsCopy = this.state.selectedOptions
    selectedOptionsCopy[selectedOption.props.name] = '';

    this.setState({
      searchInputValue: '',
      searchIndexSelected: 0,
      currentSelectedOption: selectedOption,
      selectedOptions: selectedOptionsCopy
    })
  }

  handleOptionDelete() {
    let selectedOptions = this.state.selectedOptions;
    let keys = Object.keys(selectedOptions);
    if(keys.length === 0) {
      return;
    }
    delete selectedOptions[keys[keys.length - 1]]
    this.setState({
      currentSelectedOption: null,
      selectedOptions: selectedOptions
    })
  }

  handleInputEnd() {
    let selectedOptions = this.state.selectedOptions
    for (let [key, value] of Object.entries(selectedOptions)) {
      if(!value) {
        delete selectedOptions[key]
      }
    }

    this.setState({
      currentSelectedOption: null,
      selectedOptions: selectedOptions
    })
  }

  setTextInputRef(element) {
    this.textInputRef = element;
  }

  triggerInputEnd() {
    if(this.textInputRef)
      this.textInputRef.focus();
  }

  getCurrentTags(optionList) {
    let inputs = [];

    for (let [key, value] of Object.entries(this.state.selectedOptions)) {
      let active = false;
      let inputOption = React.Children.toArray(this.props.children).find(({props}) => props.name === key);
      if(this.state.currentSelectedOption) {
        active = key === this.state.currentSelectedOption.props.name ? true : false;
      }
      inputs.push(
        <Input onInputChange={this.handleOptionTextChange.bind(this)}
                triggerInputEnd={this.triggerInputEnd.bind(this)}
                inputOption={inputOption}
                value={value}
                active={active}
                key={key}/>
      )
    }
    inputs.push(
      <InputOptionListTextField focusChangeHandler={this.changeFocus.bind(this)}
                                value={this.state.searchInputValue}
                                onChange={this.handleInputTextChange.bind(this)}
                                onOptionSelect={this.handleOptionSelect}
                                selectedOption={this.state.searchIndexSelected}
                                changeSearchIndexSelected={this.changeSearchIndexSelected.bind(this)}
                                handleOptionDelete={this.handleOptionDelete.bind(this)}
                                refInput={this.setTextInputRef.bind(this)}
                                key="search-bar-input-text">
        { optionList }
      </InputOptionListTextField>
    );
    return inputs;
  }

  getCurrentInputOptionList() {
    let children = React.Children.toArray(this.props.children);
    let allValues = children.map(child => child.props.name);
    let selectedValues = Object.keys(this.state.selectedOptions);

    for (var i=0; i<selectedValues.length; i++) {
      var index = undefined;
      while ((index = allValues.indexOf(selectedValues[i])) !== -1) {
        allValues.splice(index, 1);
      }
    }

    return children.filter(child => allValues.indexOf(child.props.name) !== -1);
  }

  render() {
    let list;
    let optionList = this.getCurrentInputOptionList()
    if (this.state.isSearching) {
      list = <InputOptionList onOptionSelect={this.handleOptionSelect}
                              currentSearchingKey={this.state.searchInputValue}
                              changeSearchIndexSelected={this.changeSearchIndexSelected.bind(this)}
                              selectedOption={this.state.searchIndexSelected}>
               { optionList }
             </InputOptionList>
    }
    return (
      <div className="search-bar">
        <div className={`search-bar__container ${ this.state.focus ? 'search-bar__container--focus' : '' }`}>
          { this.getCurrentTags(optionList) }
        </div>
        <label className={`search-bar__label ${ this.state.focus ? 'search-bar__label--float' : '' }`}>Advance Search</label>
        { list }
      </div>
    )
  }
}

AdvanceSearchBar.defaultProps = {
  s: 0
}