import React from 'react';
import ReactDOM from 'react-dom';
import TrackerButton from './TrackerButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrackerButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});