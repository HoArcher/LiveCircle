import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  onClick(filter){
     this.props.onFilterChange(filter);
  }
  //过滤(已完成，正在做，所有)
  renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return name;
    }
    return (
      <a onClick={this.onClick.bind(this,filter)}>
        {name}
      </a>
    )
  }

  render() {
    const self =this;
    return (
      <p>
        Show:
        {' '}
        {self.renderFilter('SHOW_ALL', 'All')}
        {', '}
        {self.renderFilter('SHOW_COMPLETED', 'Completed')}
        {', '}
        {self.renderFilter('SHOW_ACTIVE', 'Active')}
        .
      </p>
    );
  }
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired
};

Footer.defaultProps={

}