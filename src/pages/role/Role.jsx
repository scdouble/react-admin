import { Button, Card, message, Table } from 'antd';
import React, { Component } from 'react';

const data = [
  {
    _id: 1,
    name: 'test',
    auth_time: '123',
    auth_name: 1,
  },
];
export default class Role extends Component {
  state = {
    roles: [],
  };

  initColumns = () => {
    this.columns = [
      { title: 'ロール名', dataIndex: 'name' },
      { title: '作成日', dataIndex: 'create_time' },
      { title: '権限設定日', dataIndex: 'auth_time' },
      { title: '権限設定者', dataIndex: 'auth_name' },
    ];
  };

  onRow = (role) => {
    return {
      onClick: (event) => {
        console.log('row clicked', role);
      },
    };
  };

  componentWillMount() {
    this.initColumns();
  }
  render() {
    const { roles } = this.state;
    const title = (
      <span>
        <Button type="primary">ロール追加</Button> &nbsp;
        <Button type="primary" disabled>
          権限設定
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowSelection={{ type: 'radio' }}
          rowKey="_id"
          dataSource={data}
          columns={this.columns}
          // onRow={(record) => {
          //   return {
          //     onClick: (event) => {
          //       console.log('clicked');
          //     },
          //   };
          // }}
          onRow={this.onRow}
        ></Table>
      </Card>
    );
  }
}
