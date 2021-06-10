import React from 'react';
import ReactDOM from 'react-dom';
import ButtonControl from './ButtonControl';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ButtonControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});