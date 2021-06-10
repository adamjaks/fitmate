import React from 'react';
import ReactDOM from 'react-dom';
import TrackerTrainingPage from './TrackerTrainingPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrackerTrainingPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});