import React from 'react';
import ReactDOM from 'react-dom';
import TrainingDetailsPage from './TrainingDetailsPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrainingDetailsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});