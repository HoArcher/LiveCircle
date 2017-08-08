import React,{Component} from 'react'
import App from './containers/App'
import {render} from 'react-dom'
export default class Index extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<App {...this.props} />);
  }
}
/*
<App {...this.props} />
*/