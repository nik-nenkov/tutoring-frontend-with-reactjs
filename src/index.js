import React from 'react';
import ReactDOM from 'react-dom';
import './resources/index.css';
import App from './App';
import registerServiceWorker from './resources/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
