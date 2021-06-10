import React from 'react';
import ReactDOM from 'react-dom';
import TextareaControl from './TextareaControl';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextareaControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});