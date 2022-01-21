import { Button, Card, message, Modal, Table } from 'antd';
import React, { Component } from 'react';
import { reqAddRole, reqRoles } from '../../api';
import AddRole from './AddRole';

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
    isShowAdd: false,
    confirmLoading: false,
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

  addRole = () => {
    // formバリデーション

    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({ confirmLoading: true });
        // Formのデータを収集
        const { roleName } = values;
        this.form.resetFields();
        // APIで追加
        const result = await reqAddRole(roleName);
        if (result.status === 0) {
          // ロールリストを表示
          message.success('ロールの追加が成功しました');
          // this.getRoles();
          const role = result.data;
          //ステートの中のRolesを更新:もとのリストをベースに更新
          this.setState((state,props) => ({
            roles: [...state.roles, role],
          }));
          // const roles = this.state.roles;
          // const roles = [...this.state.roles]
          // roles.push(role);
          // this.setState({
          //   roles,
          // });

          this.setState({ confirmLoading: false });

          //モーダルを閉じる
          this.setState({ isShowAdd: false });
        } else {
          message.error('ロールの追加が失敗しました');
        }
      }
    });
  };

  handelCancel = () => {
    // formに入力された値を消す
    this.form.resetFields();
    this.setState({ isShowAdd: false });
  };

  componentDidMount() {
    this.getRoles();
  }

  componentWillMount() {
    this.initColumns();
  }
  render() {
    const { roles, selectedRole, isShowAdd, confirmLoading } = this.state;
    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ isShowAdd: true });
          }}
        >
          ロール追加
        </Button>{' '}
        &nbsp;
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
        <Modal
          title="ロールを追加"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={this.handelCancel}
          confirmLoading={confirmLoading}
        >
          <AddRole
            setForm={(form) => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
