import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RichTextField from './react-draft-wysiwyg/richTextField'
import ReactEditor from './reactEditor/reactEditor'

export default class Index extends React.Component {
    constructor() {
        super();
        this.state = {

        }

    }
    render() {
        return (
            <div>
               <RichTextField content={"23333333333"}/>
               <hr/>
               <h3>react富文本编辑器</h3>
               <ReactEditor />
            </div>

        );
    }
}

// Index.propTypes = {
//   optionalArray: PropTypes.array,
// }

// Index.defaultProps={
//     optionalArray:[],
// }
