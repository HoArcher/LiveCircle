import { combineReducers } from 'redux';
import {todos} from './reducers'

const todoApp = combineReducers({
  todos
})

export default todoApp




// import * as reducers from './reducers'

// const todoApp = combineReducers(reducers);
// export default todoApp;

/*
export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
*/