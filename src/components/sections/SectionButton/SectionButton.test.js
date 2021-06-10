import React from 'react';
import ReactDOM from 'react-dom';
import SectionButton from './SectionButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SectionButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});