import React from 'react';
import ReactDOM from 'react-dom';
import ListControl from './ListControl';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});