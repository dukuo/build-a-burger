import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux';

import reducer from './store/reducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import { Provider } from 'react-redux';

  
const reduxDev = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null

const store = createStore(
  reducer,
  reduxDev
  )

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
