import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx'
import './InputOptionList.css';

const minShowingElements = 3,
      listElementHeight = 48,
      listPadding = 16;

const getFilteredChildren = (childrenArray, searchingKey) => {
  let regex;
  if(searchingKey) {
    regex = new RegExp(searchingKey, 'i');
  }

  return childrenArray.filter((inputOption) => {
    let text = getInputDisplayName(inputOption);
    return !regex || regex.test(text)
  })
};

export default class InputOptionList extends React.Component {
  constructor(props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
  }

  onClickOption(inputOption) {
    this.props.onOptionSelect(inputOption);
  }

  onHover(index) {
    this.props.changeSearchIndexSelected(index)
  }

  renderOptions() {
    let options = getFilteredChildren(React.Children.toArray(this.props.children), this.props.currentSearchingKey);
    options = options.map((inputOption, i) => {
      let text = getInputDisplayName(inputOption);
      return (
        <li onClick={this.onClickOption.bind(this, inputOption)}
            onMouseEnter={this.onHover.bind(this, i)}
            className={`${this.props.selectedOption === i ? 'search-bar__input-options-list-li--active' : ''}`}>
          { text }
        </li>
      );
    });

    if (options.length === 0) {
      options.push(
        <li>No tags matched</li>
      )
    }
    return options;
  }

  render() {
    const elementsToShow = Math.min(minShowingElements, React.Children.count(this.props.children));
    return (
      <div className="search-bar__input-options-list"
           style={{minHeight: `${elementsToShow * listElementHeight + listPadding}px`}}>
        <ul>
          {this.renderOptions()}
        </ul>
      </div>
    )
  }
}

export { getFilteredChildren };

InputOptionList.propTypes = {
  onOptionSelect: PropTypes.func.isRequired,
  currentSearchingKey: PropTypes.string,
  changeSearchIndexSelected: PropTypes.func,
  selectedOption: PropTypes.number
}