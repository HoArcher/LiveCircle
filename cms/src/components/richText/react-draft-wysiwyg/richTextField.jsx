import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { convertFromHTML, EditorState, ContentState,convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';


export default class RichTextField extends Component {
  constructor(props) {
    super(props);

    let editorState;

    if (props.content) {
      const blocksFromHTML = convertFromHTML(props.content);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    }
    else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };
  }

  handleChange(editorState){
    //const content = convertToHTML(editorState.getCurrentContent());
    const content =draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(content);
  }

  render() {
    return (
      <Editor
        defaultEditorState={ this.state.editorState }
        onEditorStateChange={ this.handleChange }
      />
    );
  }
}

RichTextField.propTypes = {
  content: PropTypes.string
};