import { Button, Card, message, Table } from 'antd';
import React, { Component } from 'react';
import { reqRoles } from '../../api';

// const data = [
//   {
//     _id: 1,
//     name: 'test',
//     auth_time: '123',
//     auth_name: 1,
//   },
// ];
export default class Role extends Component {
  state = {
    roles: [],
    selectedRole: {}, //選択した行
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
        this.setState({ selectedRole: role });
      },
    };
  };

  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({ roles });
    }
  };

  componentDidMount() {
    this.getRoles();
  }

  componentWillMount() {
    this.initColumns();
  }
  render() {
    const { roles, selectedRole } = this.state;
    const title = (
      <span>
        <Button type="primary">ロール追加</Button> &nbsp;
        <Button type="primary" disabled={!selectedRole._id}>
          権限設定
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowSelection={{ type: 'radio', selectedRowKeys: [selectedRole._id] }}
          rowKey="_id"
          dataSource={roles}
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
