import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const html = this.props.detail;

    if (html) {
      const contentBlock = htmlToDraft(html);

      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    } else {
      this.state = {
        editorState: EditorState.createEmpty(), //空のオブジェクトを作成
      };
    }
  }

  // state = {
  //   editorState: this.props.detail || EditorState.createEmpty(), //空のオブジェクトを作成
  // };

  //入力のたびに実行される。即時に最新の状態を更新している
  onEditorStateChange = (editorState) => {
    console.log('onEditorStateChange');
    this.setState({
      editorState,
    });
  };

  // html 形式のドキュメント取得
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  };

  uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/manage/img/upload');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        const url = response.data.url;
        resolve({ data: { link: url } });
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{ border: '1px solid black', minHeight: '200px', paddingLeft: 10 }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        />
      </div>
    );
  }
}
