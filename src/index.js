import { render } from 'react-dom';
import React from 'react';
import 'react-select/dist/react-select.css';
import './styles/fontawesome.min.css';
import './styles/bootstrap.min.css';
import './styles/custom.css';
import './styles/index.css';

import AppLayout from './views/AppLayout';

import { fromJS } from 'immutable'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { rootReducers } from './redux/rootReducer'

const state = fromJS(window.__INITIAL_STATE__);
const hasReduxExtension = typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function';
const store = configureStore(state, rootReducers, hasReduxExtension);

render(
  <Provider store={store}>
    <AppLayout />
  </Provider>,
  document.getElementById('root')
);