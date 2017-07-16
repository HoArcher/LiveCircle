import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

export default function LoadReducer(rootReducer) {
    const loggerMiddleware = createLogger();
    const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )(createStore);

    const store = createStoreWithMiddleware(rootReducer);

    return store;
}