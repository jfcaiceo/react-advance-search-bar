import React from 'react';
import PropTypes from 'prop-types';

export default class DeleteIcon extends React.Component {
  render () {
    return (
      <span className={this.props.className}>
        <svg xmlns='http://www.w3.org/2000/svg' width={this.props.width || 14} height={this.props.height || 14} onClick={this.props.onClick}viewBox='0 0 24 24'>
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
        </svg>
      </span>
    );
  }
}

DeleteIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string
};
