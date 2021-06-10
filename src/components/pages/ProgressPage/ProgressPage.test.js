import React from 'react';
import ReactDOM from 'react-dom';
import ProgressPage from './ProgressPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProgressPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});