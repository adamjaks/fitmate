import React from 'react';
import ReactDOM from 'react-dom';
import SectionLastTraining from "./SectionLastTraining";

it('It should mount', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SectionLastTraining />, div);
    ReactDOM.unmountComponentAtNode(div);
});