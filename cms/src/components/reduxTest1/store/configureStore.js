import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from '../reducers/todoApp'


export default function configureStore(initialState) {
  const loggerMiddleware = createLogger()

  const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore)

  const strore = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });

  }
  return strore;
}