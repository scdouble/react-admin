import React, { Component } from 'react';
import { Card, Table, Icon, Button, message, Modal } from 'antd';
import { reqCategoryList, reqAddCategory, reqUpdateCategory } from '../../api';

import AddForm from './AddForm';
import UpdateForm from './UpdateForm';
export default class Category extends Component {
  state = {
    isLoading: false,
    categoryList: [], //親カテゴリのリスト
    subCategoryList: [], //子カテゴリのリスト
    parentId: '0', //親カテゴリのId
    parentName: '', // 親カテゴリの名前
    showStatus: 0, //モーダルの表示方法を標識するため。0→表示しない １：カテゴリー追加を表示　２：カテゴリー修正を表示
  };

  showCategoryList = () => {
    // Stateを親カテゴリーを取得するような状態に変更する
    this.setState(
      {
        parentId: '0',
        parentName: '',
        subCategoryList: [],
      },
      // () => {
      //   //このCallback関数はState変更後、且つrender()の後に実行される
      //   console.log("parentId", this.state.parentId);
      //   // 子カテゴリーのリストを取得
      //   this.getCategoryList();
      // }
    );
    // setStateは　非同期型なので、setStateの後はすぐに最新のStateを取得できない。
  };

  //指定する親カテゴリの子カテゴリリストを取得する
  showSubCategoryList = (record) => {
    // 更新State。コールバック関数を使う
    this.setState(
      {
        parentId: record._id,
        parentName: record.name,
      },
      () => {
        //このCallback関数はState変更後、且つrender()の後に実行される
        console.log('parentId', this.state.parentId);
        // 子カテゴリーのリストを取得
        this.getCategoryList();
      },
    );
    // setStateは　非同期型なので、setStateの後はすぐに最新のStateを取得できない。
  };

  /**
   * テーブルの列を初期化する
   */
  initTableColumns = () => {
    this.columns = [
      {
        title: 'カテゴリー名',
        dataIndex: 'name', //データ表示するための属性名
      },
      {
        title: 'アクション',
        width: 300,
        render: (
          record, // 画面に表示するためのタグを指定
        ) => (
          <span>
            <Button onClick={() => this.showUpdateCategory(record)} type="link">
              編集
            </Button>
            {/* Eventのコールバック関数にパラメータを渡す：まずは匿名関数を定義、関数の中で処理のロジックを定義し、パラメータを入れる */}
            {/* onClick={() => this.showSubCategoryList(record)}の返り値は気にしないから、this.showSubCategoryListは{}をつけなくても大丈夫。 */}
            {this.state.parentId === '0' ? ( // 子カテゴリの場合に小分類を見るLinkを非表示
              <Button onClick={() => this.showSubCategoryList(record)} type="link">
                子分類を見る
              </Button>
            ) : null}
          </span>
        ),
      },
    ];
  };

  /**
   * 親もしくは子カテゴリーデータを取得する
   *
   * @param {string} parentId parentIdの指定がなければ、Stateの中からデータを取得してAPIリクエストを出す
   */
  getCategoryList = async (parentId) => {
    // リクエストする前にLoadingを表示
    this.setState({ isLoading: true });

    // StateからparentIdを取得
    parentId = parentId || this.state.parentId;
    // const {parentId } = this.state

    // parentIdを元にカテゴリーを取得
    const result = await reqCategoryList(parentId);

    // リクエストする後にLoadingを非表示
    this.setState({ isLoading: false });

    // データ取得に成功した場合
    if (result.status === 0) {
      // 親もしくは子カテゴリーのデータリストを取り出す。
      if (parentId === '0') {
        // 親カテゴリを更新
        this.setState({ categoryList: result.data });
      } else {
        // 子カテゴリを更新
        this.setState({ subCategoryList: result.data });
      }

      // データ取得に失敗した場合
    } else {
      message.error('カテゴリデータの取得に失敗しました');
    }
  };

  /**
   * モーダル制御のコールバック
   */

  handleCancel = () => {
    // formに入力された値を消す
    this.form.resetFields();
    this.setState({ showStatus: 0 });
  };

  showAddCategory = () => {
    this.setState({ showStatus: 1 });
  };

  addCategory = (params) => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // データを収集
        const { categoryName, parentId } = this.form.getFieldsValue();
        // モーダルを閉じる
        this.setState({ showStatus: 0 });
        // formに入力された値を消す
        this.form.resetFields();
        // リクエストを出す
        const result = await reqAddCategory(parentId, categoryName);
        if (result.status === 0) {
          // 新しくカテゴリーを取得
          if (parentId === this.state.parentId) {
            //追加したカテゴリーと現在表示しているカテゴリと同じのときにデータを再取得
            this.getCategoryList();
          } else if (parentId === '0') {
            //子カテゴリで親カテゴリを追加した場合、もう一度親カテゴリのリストを取得する。画面の遷移はなし
            // this.setState({parentId:'0'},()=>{})
            this.getCategoryList('0');
          }
        }
      }
    });
  };

  showUpdateCategory = (record) => {
    this.record = record;
    this.setState({ showStatus: 2 });
  };

  updateCategory = (params) => {
    // formのバリデーション
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // データを準備
        const categoryId = this.record._id;
        const { categoryName } = values;
        // formに入力された値を消す
        this.form.resetFields();

        // モーダルを閉じる
        this.setState({ showStatus: 0 });

        // APIコール
        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          // 新しくカテゴリーを取得
          this.getCategoryList();
        }
      }
    });
  };

  /**
   * ライフサイクルメソッド
   */
  // 初回のRenderのためにデータを獲得するために実行
  componentWillMount() {
    this.initTableColumns();
  }

  // 非同期側のことをする
  componentDidMount() {
    this.getCategoryList();
  }

  render() {
    const {
      categoryList,
      subCategoryList,
      parentId,
      parentName,
      isLoading,
      showStatus,
      confirmLoading,
    } = this.state;

    const category = this.record || {};

    // Cardの右のタイトル
    const title =
      parentId === '0' ? (
        'カテゴリー一覧'
      ) : (
        <span>
          <Button type="link" onClick={this.showCategoryList}>
            {' '}
            カテゴリー一覧
          </Button>
          <Icon type="arrow-right" style={{ marginRight: '5px' }} />
          <span> {parentName}</span>
        </span>
      );
    // Cardの左のボタン
    const extra = (
      <Button onClick={this.showAddCategory} type="primary">
        <Icon type="plus"></Icon>
        追加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        {/* テーブル */}
        <Table
          dataSource={parentId === '0' ? categoryList : subCategoryList}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={isLoading}
        ></Table>

        {/* モーダル */}
        <Modal
          title="カテゴリーを追加"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <AddForm
            categoryList={categoryList}
            parentId={parentId}
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>

        <Modal
          title="カテゴリーを修正"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => {
              this.form = form;
            }} //updateのformを受け取り　　this.formに保存する
          />
        </Modal>
      </Card>
    );
  }
}
