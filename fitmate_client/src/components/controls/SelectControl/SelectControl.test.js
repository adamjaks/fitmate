import React from 'react';
import ReactDOM from 'react-dom';
import SelectControl from './SelectControl';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});