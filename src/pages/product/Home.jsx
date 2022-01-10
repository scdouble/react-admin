
import React, { Component } from 'react'
import { Card, Select, Button, Input, Icon, Table } from 'antd'
import { reqProducts, reqSearchProducts } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';


const { Option } = Select


export default class ProductHome extends Component {

  constructor(props) {
    super(props);
    this.initColumns();
    this.state = {
      product: [],
      total: 0,
      isLoading: false,
      searchType: "productName",
      searchName: ""
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
        title: "状態", dataIndex: "status", width: 100,
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
        title: "操作", width: 100, render: (record) => {
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

  /**
   * 指定したページ番号の商品を取得
   * @param {number} pageNum
   */
  getProducts = async (pageNum) => {
    this.setState({ isLoading: true }) // 表のLoadingを表示

    const { searchName, searchType } = this.state
    let result;
    // searchNameに値が入っているなら,
    if (searchName) {
      result = await reqSearchProducts({ pageNum, PAGE_SIZE, searchName, searchType })
    } else {//普通に商品の情報を取得
      result = await reqProducts(pageNum, PAGE_SIZE)

    }
    this.setState({ isLoading: false })// 表のLoa　dingを非表示

    if (result.status === 0) {
      const { list, total } = result.data
      this.setState({ products: list, total: total })
    }

  }

  componentDidMount() {
    this.getProducts(1)
  }



  render() {

    const { products, total, isLoading, searchType, searchName } = this.state
    const title = (
      <span>
        <Select onChange={(value) => { this.setState({ searchType: value }) }} value={searchType} style={{ width: 150 }}>
          <Option value="productName" >名前で検索</Option>
          <Option value="productDesc">説明で検索</Option>
        </Select>
        <Input
          onChange={(event) => { this.setState({ searchName: event.target.value }) }}
          value={searchName} placeholder='キーワードを入力してください'
          style={{ width: 200, margin: "0 15px 0" }}
        />
        <Button onClick={() => { this.getProducts(1) }} type='primary'>
          検索
        </Button>
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
          loading={isLoading}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: (pageNum) => { this.getProducts(pageNum) }
          }}
        />
      </Card>
    )
  }
}
