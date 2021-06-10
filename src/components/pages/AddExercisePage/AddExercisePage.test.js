import React from 'react';
import ReactDOM from 'react-dom';
import AddExercisePage from './AddExercisePage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddExercisePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});