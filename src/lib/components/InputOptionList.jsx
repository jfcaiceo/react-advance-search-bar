import React from 'react';
import PropTypes from 'prop-types';
import { getInputDisplayName } from './InputOption.jsx';
import './InputOptionList.css';

const minShowingElements = 3;
const listElementHeight = 48;
const listPadding = 16;

const getFilteredChildren = (childrenArray, searchingKey) => {
  let regex;
  if (searchingKey) {
    regex = new RegExp(searchingKey, 'i');
  }

  return childrenArray.filter((inputOption) => {
    let text = getInputDisplayName(inputOption);
    return !regex || regex.test(text);
  });
};

export default class InputOptionList extends React.Component {
  constructor (props) {
    super(props);
    this.renderOptions = this.renderOptions.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    this.onHover = this.onHover.bind(this);
    this.divRef = null;
  }

  onClickOption (inputOption, event) {
    event.preventDefault();
    this.props.onOptionSelect(inputOption);
  }

  onHover (index) {
    this.props.changeSearchIndexSelected(index);
  }

  setDivRef (element) {
    this.divRef = element;
  }

  shouldComponentUpdate (prevProps) {
    return (
      prevProps.currentSearchingKey !== this.props.currentSearchingKey ||
      prevProps.selectedOption !== this.props.selectedOption ||
      prevProps.children !== this.props.children
    );
  }

  componentDidUpdate () {
    if (this.divRef) {
      let lowCurrentIndex = parseInt(this.divRef.scrollTop / listElementHeight);
      let maxCurrentIndex = lowCurrentIndex + minShowingElements;

      if (this.props.selectedOption <= lowCurrentIndex) {
        let scrollPixels = this.props.selectedOption * listElementHeight;
        this.divRef.scrollTop = scrollPixels;
      } else if (this.props.selectedOption >= maxCurrentIndex) {
        let element = this.props.selectedOption + 1 - minShowingElements;
        let scrollPixels = element * listElementHeight;
        this.divRef.scrollTop = scrollPixels;
      }
    }
  }

  renderOptions () {
    let options = getFilteredChildren(React.Children.toArray(this.props.children), this.props.currentSearchingKey);
    options = options.map((inputOption, i) => {
      let text = getInputDisplayName(inputOption);
      return (
        <li onMouseDown={(e) => { this.onClickOption(inputOption, e); }}
          onMouseEnter={() => this.onHover(i)}
          className={`${this.props.selectedOption === i ? 'search-bar__input-options-list-li--active' : ''}`}
          key={inputOption.props.name}>
          { text }
        </li>
      );
    });

    if (options.length === 0) {
      options.push(
        <li key='no_tag'>{this.props.notTagFound}</li>
      );
    }
    return options;
  }

  render () {
    const elementsToShow = Math.min(minShowingElements, React.Children.count(this.props.children));
    return (
      <div className={`search-bar__input-options-list ${this.props.positionAbsolute ? 'search-bar__input-options-list--absolute' : ''}`}
        style={{ minHeight: `${elementsToShow * listElementHeight + listPadding}px` }}
        ref={this.setDivRef.bind(this)}>
        <ul>
          {this.renderOptions()}
        </ul>
      </div>
    );
  }
}

export { getFilteredChildren };

InputOptionList.propTypes = {
  onOptionSelect: PropTypes.func.isRequired,
  changeSearchIndexSelected: PropTypes.func.isRequired,
  currentSearchingKey: PropTypes.string,
  selectedOption: PropTypes.number,
  positionAbsolute: PropTypes.bool,
  notTagFound: PropTypes.string,
  children: PropTypes.node
};

InputOptionList.defaultProps = {
  positionAbsolute: true,
  notTagFound: ''
};
