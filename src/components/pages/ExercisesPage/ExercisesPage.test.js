import React from 'react';
import ReactDOM from 'react-dom';
import ExercisesPage from './ExercisesPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExercisesPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});