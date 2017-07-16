// modules/NavLink.js
import React from 'react'
import { Link } from 'react-router'

export default class NavLink extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Link {...this.props} activeClassName="active" />
    );
  }
}


