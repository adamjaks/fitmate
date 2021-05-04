import React from 'react';
import './ButtonControl.scss';

const ButtonControl = (props) => (
  <button className="ButtonControl">
      { props.value }
  </button>
);

ButtonControl.propTypes = {};

ButtonControl.defaultProps = {
    type: "text"
};

export default ButtonControl;
