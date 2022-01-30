import React from 'react';
import PropTypes from 'prop-types';

import { Upload, Icon, Modal, message } from 'antd';
import { reqDeleteImage } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';
/**
 * 画像をUploadするコンポーネント
 */

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array,
  };
  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   fileList: [
  //     {
  //       uid: '-1',
  //       name: 'image.png', //画像のファイル名
  //       status: 'done', //画像のステータス
  //       url: 'http://localhost:5001/upload/image-1642595056498.jpg',
  //     },
  //   ],
  // };

  constructor(props) {
    super(props);

    const fileList = [];

    // propsからimgsを受け取ると
    const { imgs } = this.props;
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => {
        return {
          uid: -index,
          name: img,
          status: 'done',
          url: BASE_IMG_URL + img,
        };
      });
    }

    // 状態の初期化
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList, //  アップロードした画像のリスト
    };
  }

  /**
   * アップロードしたファイル名のリストを取得する
   * @returns filename list
   */
  getImgs = () => {
    return this.state.fileList.map((file) => {
      return file.name;
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /**
   * file:現在操作している画像ファイル（アップロード、削除）
   * fileList:すでにアップロードしたファイルのリスト
   * @param {*} param0
   */
  handleChange = async ({ file, fileList }) => {
    // console.log('handleChange()', file, fileList.length, file);

    // アップロードが成功した際、Uploadしたファイルの情報を修正（name, url）
    if (file.status === 'done') {
      const result = file.response; //{status:0,data:{name:'xxx.jpg',url:'http://xxxx'}}
      if (result.status === 0) {
        message.success('ファイルアップロードが成功しました');
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error('ファイルアップロードが失敗しました');
      }
    } else if (file.status === 'removed') {
      //画像を消す
      const result = await reqDeleteImage(file.name);
      if (result.status === 0) {
        message.success('ファイルを削除しました');
      } else {
        message.error('ファイル削除が失敗しました');
      }
    }
    //ファイルの操作（アップロード、削除)中にStateを更新
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          accept="image/*" //画像ファイルだけを受け取る
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList} //uploadしたファイルのリスト
          name="image" //POSTリクストの時のKEY名
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
