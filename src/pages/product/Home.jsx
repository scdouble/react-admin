import React, { Component } from 'react'
import { Card, Select, Button, Input, Icon, Table, message } from 'antd'
import { reqProducts, reqSearchProducts, reqUpdateProductStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

const { Option } = Select

export default class ProductHome extends Component {
  constructor(props) {
    super(props)
    this.initColumns()
    this.state = {
      products: [],
      total: 0,
      isLoading: false,
      searchType: 'productName',
      searchName: '',
    }
  }

  // テーブルの列を初期化する
  initColumns = () => {
    this.columns = [
      { title: '商品名', dataIndex: 'name' },
      { title: '説明', dataIndex: 'desc' },
      {
        title: '値段',
        dataIndex: 'price', //dataIndexで値を指定していれば、renderはその値を引数として受け取る。dataIndexの指定がなければ、Renderは行のレコードを受け取る
        render: (price) => {
          return '¥' + price
        },
      },
      {
        title: '状態',
        width: 100,
        render: (record) => {
          return (
            <span>
              <span>{record.status === 1 ? '販売中' : '取り下げ済み'}</span>
              <Button onClick={() => this.updateStatus(record._id, record.status === 1 ? 2 : 1)} type="primary">
                {record.status === 1 ? '取り下げ' : '販売'}
              </Button>
            </span>
          )
        },
      },
      {
        title: '操作',
        width: 100,
        render: (record) => {
          return (
            <span>
              {/* ProductのObjectをRouteのStateとして目的にRouteに渡す */}
              <Button onClick={() => this.props.history.push('/product/detail', { record })} type="link">
                詳細
              </Button>
              <Button type="link">編集</Button>
            </span>
          )
        },
      },
    ]
  }

  updateStatus = async (productId, status) => {
    const result = await reqUpdateProductStatus(productId, status)
    if (result.status === 0) {
      message.success('State Update OK')
      this.getProducts(this.pageNum)
    }
  }
  /**
   * 指定したページ番号の商品を取得
   * @param {number} pageNum
   */
  getProducts = async (pageNum) => {
    this.pageNum = pageNum //pageNumを保存
    this.setState({ isLoading: true }) // 表のLoadingを表示

    const { searchName, searchType } = this.state
    let result
    // searchNameに値が入っているなら,
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        PAGE_SIZE,
        searchName,
        searchType,
      })
    } else {
      //普通に商品の情報を取得
      result = await reqProducts(pageNum, PAGE_SIZE)
    }
    this.setState({ isLoading: false }) // 表のLoa　dingを非表示

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
        <Select
          onChange={(value) => {
            this.setState({ searchType: value })
          }}
          value={searchType}
          style={{ width: 150 }}
        >
          <Option value="productName">名前で検索</Option>
          <Option value="productDesc">説明で検索</Option>
        </Select>
        <Input
          onChange={(event) => {
            this.setState({ searchName: event.target.value })
          }}
          value={searchName}
          placeholder="キーワードを入力してください"
          style={{ width: 200, margin: '0 15px 0' }}
        />
        <Button
          onClick={() => {
            this.getProducts(1)
          }}
          type="primary"
        >
          検索
        </Button>
      </span>
    )

    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
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
            onChange: (pageNum) => {
              this.getProducts(pageNum)
            },
          }}
        />
      </Card>
    )
  }
}
