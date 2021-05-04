import React from 'react';
import './InputControl.scss';

const InputControl = (props) => (
  <div className="InputControl">
    <input className={"InputControl__input"}
           type={props.type}
           placeholder={props.placeholder}
           onChange={props.onChange}
           value={props.value}
           id={props.id}
    />
  </div>
);

InputControl.propTypes = {};

InputControl.defaultProps = {
    type: "text"
};

export default InputControl;
