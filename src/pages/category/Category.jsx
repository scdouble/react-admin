import React, {Component} from 'react'
import {Card, Table, Icon, Button, message} from 'antd';
import {reqCategoryList} from '../../api';


const data = [
  {
    _id: "001",
    name: 'コンピューター',
    parentId: "0",
  },
  {
    _id: "002",
    name: '洋服',
    parentId: "0",
  },
  {
    _id: "003",
    name: '書籍',
    parentId: "0",
  },
  {
    _id: "004",
    name: '食品',
    parentId: "0",
  }
];

export default class Category extends Component {

  state = {
    isLoading: false,
    categoryList: [{
      _id: "001",
      name: 'コンピューター',
      parentId: "0",
    },
      {
        _id: "002",
        name: '洋服',
        parentId: "0",
      },
      {
        _id: "003",
        name: '書籍',
        parentId: "0",
      },
      {
        _id: "004",
        name: '食品',
        parentId: "0",
      }],

  }

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
        render: () => (// 画面に表示するためのタグを指定
          <span>
            <Button type="link">編集</Button>
            <Button type="link">子分類を見る</Button>

          </span>
        ),
      },
    ];
  }

  getCategoryList = async () => {
    // リクエストする前にLoadingを表示
    this.setState({isLoading: true})

    const result = await reqCategoryList('0')

    // リクエストする後にLoadingを非表示
    this.setState({isLoading: false})

    if (result.status === 0) {
      this.setState({categoryList: result.data})
    } else {
      message.error("カテゴリのデータ取得に失敗しました")

    }
  }

  // 初回のRenderのためにデータを獲得するために実行
  componentWillMount() {
    this.initTableColumns();
  }

  // 非同期側のことをする
  componentDidMount() {
    this.getCategoryList();
  }

  render() {

    const {categoryList} = this.state
    // Cardの右のタイトル
    const title = 'カテゴリー一覧'
    const extra = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        追加
      </Button>
    )
    return (

      <Card title={title} extra={extra}>
        <Table
          dataSource={categoryList}
          columns={this.columns}
          bordered
          rowKey='_id'
          loading={this.state.isLoading}
        >
        </Table>
      </Card>
    )
  }
}
