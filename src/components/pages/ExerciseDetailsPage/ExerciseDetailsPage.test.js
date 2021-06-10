import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseDetailsPage from './ExerciseDetailsPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExerciseDetailsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});