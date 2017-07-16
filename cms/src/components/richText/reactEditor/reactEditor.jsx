import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState } from 'draft-js';

// import {cssPrefix} from '../../utils/cssUtils'; 
// const cssRoot = cssPrefix +'-ReactEditor';

export default class ReactEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };

    }

    componentWillMount() {

    }
    onChange(editorState) {
        console.log(editorState.getCurrentContent());
        this.setState({ editorState })
    }
    render() {
        const self = this;
        return (
            <div>
                <Editor
                EditorChangeType={`adjust-depth`}
                editorState={this.state.editorState} 
                onChange={this.onChange.bind(this)} />
            </div>
        );
    }
}

//限定控件传入的属性类型
//ReactEditor.propTypes={
//       index:PropTypes:number
//}

//设置默认属性
//ReactEditor.defaultProps={
//  index:1,
//};