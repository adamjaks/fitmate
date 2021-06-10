import React from 'react';
import ReactDOM from 'react-dom';
import EditExercisePage from './EditExercisePage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditExercisePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});