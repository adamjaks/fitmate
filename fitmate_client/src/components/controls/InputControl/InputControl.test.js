import React from 'react';
import ReactDOM from 'react-dom';
import InputControl from './InputControl';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<InputControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});