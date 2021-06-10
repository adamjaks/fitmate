import React from 'react';
import ReactDOM from 'react-dom';
import RegisterPage from './RegisterPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});