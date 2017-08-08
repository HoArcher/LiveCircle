import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'



import { TreeSelect  } from 'antd';
const TreeNode = TreeSelect.TreeNode;

export default class Home1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             value: undefined,
        }
    }
    onChange(value){
        console.log(arguments);
        this.setState({ value });
    }
    render() {

        return (
            <div>
            <TreeSelect
                showSearch
                style={{ width: 300 }}
                value={this.state.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={this.onChange}
            >
                <TreeNode value="parent 1" title="parent 1" key="0-1">
                    <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                        <TreeNode value="leaf1" title="my leaf" key="random" />
                        <TreeNode value="leaf2" title="your leaf" key="random1" />
                    </TreeNode>
                    <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                        <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                    </TreeNode>
                </TreeNode>
            </TreeSelect>
            <p>23332222</p>
          
            </div>



        );
    }
}

// App.propTypes = {
//   optionalArray: PropTypes.array,
// }

// App.defaultProps={
//     optionalArray:[],
// }
