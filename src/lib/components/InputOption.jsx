import React from 'react';

export default class InputOption extends React.Component {
  render () {
    return null;
  }
}

const getInputDisplayName = ({ props }) => {
  const displayName = props.label ? props.label : props.name;
  return displayName;
};

export { getInputDisplayName };
