import React from 'react';
import ReactDOM from 'react-dom';
import MultipleChoiceControl from './MultipleChoiceControl';

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MultipleChoiceControl />, div);
    ReactDOM.unmountComponentAtNode(div);
});