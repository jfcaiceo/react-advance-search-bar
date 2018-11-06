import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx'
import './InputOptionList.css';

const minShowingElements = 3,
      listElementHeight = 48,
      listPadding = 16;
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
    let regex;
    if(!!this.props.currentSearchingKey) {
      regex = new RegExp(this.props.currentSearchingKey, 'i');
    }

    let index = -1;
    let options = React.Children.map(this.props.children, (inputOption) => {
      let text = getInputDisplayName(inputOption);
      if(!!regex && !regex.test(text)) {
        return null;
      }
      index ++;
      return (
        <li onClick={this.onClickOption.bind(this, inputOption)}
            onMouseEnter={this.onHover.bind(this, index)}
            className={`${this.props.selectedOption === index ? 'search-bar__input-options-list-li--active' : ''}`}>
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

InputOptionList.propTypes = {
  onOptionSelect: PropTypes.func.isRequired,
  currentSearchingKey: PropTypes.string,
  changeSearchIndexSelected: PropTypes.func,
  selectedOption: PropTypes.number
}