import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Main from './components/Main/Main';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
