import { combineReducers } from 'redux';
import {todos,visibilityFilter} from './reducers'

const todoApp = combineReducers({
  visibilityFilter,
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