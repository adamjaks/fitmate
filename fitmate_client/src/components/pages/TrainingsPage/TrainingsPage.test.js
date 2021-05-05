import React from 'react';
import ReactDOM from 'react-dom';
import TrainingsPage from './TrainingsPage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrainingsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});