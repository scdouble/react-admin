import React, { Component } from "react";
import { Card, Table, Icon, Button, message } from "antd";
import { reqCategoryList } from "../../api";

export default class Category extends Component {
  state = {
    isLoading: false,
    categoryList: [], //親カテゴリのリスト
    subCategoryList: [], //子カテゴリのリスト
    parentId: "0", //親カテゴリのId
    parentName: "", // 親カテゴリの名前
  };

  showCategoryList = () =>{
    // Stateを親カテゴリーを取得するような状態に変更する
    this.setState(
      {
        parentId: '0',
        parentName: '',
        subCategoryList:[]
      },
      // () => {
      //   //このCallback関数はState変更後、且つrender()の後に実行される
      //   console.log("parentId", this.state.parentId);
      //   // 子カテゴリーのリストを取得
      //   this.getCategoryList();
      // }
    );
    // setStateは　非同期型なので、setStateの後はすぐに最新のStateを取得できない。
  }

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
        console.log("parentId", this.state.parentId);
        // 子カテゴリーのリストを取得
        this.getCategoryList();
      }
    );
    // setStateは　非同期型なので、setStateの後はすぐに最新のStateを取得できない。
  };

  /**
   * テーブルの列を初期化する
   */
  initTableColumns = () => {
    this.columns = [
      {
        title: "カテゴリー名",
        dataIndex: "name", //データ表示するための属性名
      },
      {
        title: "アクション",
        width: 300,
        render: (
          record // 画面に表示するためのタグを指定
        ) => (
          <span>
            <Button type="link">編集</Button>
            {/* Eventのコールバック関数にパラメータを渡す：まずは匿名関数を定義、関数の中で処理のロジックを定義し、パラメータを入れる */}
            {/* onClick={() => this.showSubCategoryList(record)}の返り値は気にしないから、this.showSubCategoryListは{}をつけなくても大丈夫。 */}
            {this.state.parentId === "0" ? ( // 子カテゴリの場合に小分類を見るLinkを非表示
              <Button
                onClick={() => this.showSubCategoryList(record)}
                type="link"
              >
                子分類を見る
              </Button>
            ) : (
              null
            )}
          </span>
        ),
      },
    ];
  };

  // 親もしくは子カテゴリーデータを取得する
  getCategoryList = async () => {
    console.log("getCategoryList");
    // リクエストする前にLoadingを表示
    this.setState({ isLoading: true });

    // StateからparentIdを取得
    const { parentId } = this.state;

    // parentIdを元にカテゴリーを取得
    const result = await reqCategoryList(parentId);

    // リクエストする後にLoadingを非表示
    this.setState({ isLoading: false });

    // データ取得に成功した場合
    if (result.status === 0) {
      // 親もしくは子カテゴリーのデータリストを取り出す。
      if (parentId === "0") {
        // 親カテゴリを更新
        this.setState({ categoryList: result.data });
      } else {
        // 子カテゴリを更新
        this.setState({ subCategoryList: result.data });
      }

      // データ取得に失敗した場合
    } else {
      message.error("カテゴリのデータ取得に失敗しました");
    }
  };

  // 初回のRenderのためにデータを獲得するために実行
  componentWillMount() {
    this.initTableColumns();
  }

  // 非同期側のことをする
  componentDidMount() {
    this.getCategoryList();
  }

  render() {
    const { categoryList, subCategoryList, parentId, parentName, isLoading } =
      this.state;
    // Cardの右のタイトル
    const title = parentId === '0' ? 'カテゴリー一覧' : (
      <span>
        <Button type="link" onClick={this.showCategoryList}> カテゴリー一覧</Button>
        <Icon type="arrow-right" style={{ marginRight: '5px' }} />
        <span> {parentName}</span>

      </span>
    )
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        追加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          dataSource={parentId === "0" ? categoryList : subCategoryList}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={isLoading}
        ></Table>
      </Card>
    );
  }
}
