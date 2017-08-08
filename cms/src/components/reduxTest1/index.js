import 'babel-polyfill'
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {combineReducers,bindActionCreators} from 'redux'
import {Provider,connect} from 'react-redux'

import * as Actions from './actions/actions'
import LoadReducer from './store/loadReducers'
import AllReducer from './reducers/allReducer'

import IndexView from './containers/indexView'

let App =connect(state=>{
  return  state.AllReducer ,dispath=>{
    let bindAction = bindActionCreators(Actions,dispath)

    return {actions:bindAction}
  }
})(IndexView);

let rootReducer =combineReducers({
  AllReducer:AllReducer,
})

let store = LoadReducer(rootReducer);

export default class Index extends React.Component{
  
  render(){
    return(
      <Provider store={store}>
         <App {...this.props} />
      </Provider>
    );
  }
}
