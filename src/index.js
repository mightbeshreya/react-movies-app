import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './screens/home/Home';
import './common/common.css';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Controller from './screens/Controller';

ReactDOM.render(
  <React.StrictMode>
    <Controller/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
