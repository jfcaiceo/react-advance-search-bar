import React from 'react';
import PropTypes from 'prop-types';

export default class InputOption extends React.Component {
  render() {
    return null
  }
}

const getInputDisplayName = ({props}) => {
  const displayName = !!props.label ? props.label : props.name;
  return displayName;
};

export { getInputDisplayName };

InputOption.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}