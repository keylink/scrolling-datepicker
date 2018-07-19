import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore (initialState, rootReducer, hasReduxExtension) {
  const middleware = applyMiddleware(thunk, promiseMiddleware());

  let createStoreWithMiddleware;

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === 'development') {
    let enhancers = [];
    if (hasReduxExtension) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
    else {
      enhancers = [require('./utils/DevTools').default.instrument()];
    }

    createStoreWithMiddleware = composeEnhancers(
      middleware,
      ...enhancers
    )
  }
  else {
    createStoreWithMiddleware = composeEnhancers(
      middleware
    )
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  return store;
}
