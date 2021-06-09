import React from 'react';
import ReactDOM from 'react-dom';
import EditTrainingPage from './EditTrainingPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditTrainingPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});