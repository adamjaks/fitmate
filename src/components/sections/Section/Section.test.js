import React from 'react';
import ReactDOM from 'react-dom';
import Section from './Section';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Section />, div);
  ReactDOM.unmountComponentAtNode(div);
});