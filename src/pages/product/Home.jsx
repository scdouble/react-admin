
import React, { Component } from 'react'
import { Card, Select, Button, Input, Icon, Table } from 'antd'
const { Option } = Select



//
export default class ProductHome extends Component {

  constructor(props) {
    super(props);
    this.initColumns();
    this.state = {
      products: [
        {
          "status": 1,
          "imgs": ["img-123.jpg"],
          "_id": "123123",
          "name": "レノボPC",
          "desc": "2021最新",
          "price": 66000,
          "pCategoryId": "001",
          "categoryId": "002"
        }
      ]
    }
  }


  // テーブルの列を初期化する
  initColumns = () => {
    this.columns = [
      { title: "商品名", dataIndex: "name" },
      { title: "説明", dataIndex: "desc" },
      {
        title: "値段", dataIndex: "price", //dataIndexで値を指定していれば、renderはその値を引数として受け取る。dataIndexの指定がなければ、Renderは行のレコードを受け取る
        render: (price) => { return '¥' + price }
      },
      {
        title: "状態", dataIndex: "status",width:100,
        render: (status) => {
          return (
            <span>
              <span>販売中</span>
              <Button type="primary">取り下げ</Button>
            </span>
          )
        }
      },
      {
        title: "アクション",width:100, render: (record) => {
          return (
            <span>
              <Button type="link">詳細</Button>
              <Button type="link">編集</Button>
            </span>
          )
        }
      }
    ]

  }


  render() {

    const { products } = this.state
    const title = (
      <span>
        <Select value="1" style={{ width: 150 }}>
          <Option value="1" >名前で検索</Option>
          <Option value="2">説明で検索</Option>
        </Select>
        <Input placeholder='キーワードを入力してください' style={{ width: 200, margin: "0 15px 0" }}></Input>
        <Button type='primary'>検索</Button>
      </span>
    )

    const extra = (

      <Button type="primary">
        <Icon type="plus" />
        商品を追加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
        />
      </Card>
    )
  }
}
