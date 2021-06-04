import React from 'react';
import ReactDOM from 'react-dom';
import TrackerConfigPage from './TrackerConfigPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrackerConfigPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});