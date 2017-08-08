import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from 'antd';

export default class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleClick() {
    let text = this.refs.myTextInput.value;
    if (this.props.onAddClick) {
      this.props.onAddClick(text);
      this.refs.myTextInput.value = '';
    }


  }
  render() {
    const self = this;
    return (
      <div>
        <input type='text' ref="myTextInput" />
        <button onClick={self.handleClick.bind(this)}>
          Add
        </button>
      </div>
    );
  }


}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
// AddTodo.defaultProps={
//     optionalArray:[],
// }