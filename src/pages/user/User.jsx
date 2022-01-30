import React, { Component } from 'react';
import { Button, Card, message, Modal, Table } from 'antd';
import { formateDate } from '../../utils/dateUtils';
import { PAGE_SIZE } from '../../utils/constants';
import { reqAddOrUpdateUser, reqDeleteUser, reqUsers } from '../../api';
import UserForm from './UserForm';

export default class User extends Component {
  state = { users: [], roles: [], isShow: false };

  initColumn = () => {
    this.columns = [
      { title: 'ユーザネーム', dataIndex: 'username' },
      { title: 'メールアドレス', dataIndex: 'email' },
      { title: '登録日時', dataIndex: 'create_time', render: formateDate },
      {
        title: 'ロール',
        dataIndex: 'role_id',
        render: (role_id) => {
          // return this.state.roles.find(role => role_id === role._id).name
          return this.roleNames[role_id];
        },
      },
      {
        title: '操作',
        render: (userRecord) => {
          return (
            <span>
              <Button type={"link"} onClick={() => {
                return this.showUpdate(userRecord);
              }}>編集</Button>
              <Button type={"link"} onClick={() => {
                return this.deleteUser(userRecord);
              }}>削除</Button>
            </span>
          );
        },
      },
    ];
  };

  showAdd = () => {
    this.user = null;
    this.setState({ isShow: true });
  };

  showUpdate = (user) => {
    this.user = user;// userを保存
    this.setState({ isShow: true });
  };


  /**
   * 指定したユーザを削除
   * @param userRecord
   */
  deleteUser = (userRecord) => {
    Modal.confirm({
      title: `${userRecord.username}を削除しますか？`,
      onOk: async () => {
        const result = await reqDeleteUser(userRecord._id);
        if (result.status === 0) {
          message.success('削除が完了しました');
          this.getUsers();
        }
      },
      onCancel() {
        console.log('delete user canceled');
      },
    });
  };

  /**
   * ロールのリストを元に、すべてのロール名が含まれているオブジェクトを生成する
   * @param roles
   */
  iniRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
    // データ保存
    this.roleNames = roleNames;
  };

  /**
   * ユーザの追加もしくは削除
   * @returns {Promise<void>}
   */
  addOrUpdateUser = async () => {
    this.setState({ isShow: false });

    //更新があればuserに_idを追加
    if (this.user) {
      user._id = this.user_id;
    }
    // Formデータ収集
    const user = this.form.getFieldsValue();
    this.form.resetFields();
    // APIにリクエスト
    const result = await reqAddOrUpdateUser(user);
    if (result.status === 0) {
      message.success(`ユーザの${this.user ? '編集' : '追加'}が完了しました`);
      this.getUsers();
    }


  };

  getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      this.iniRoleNames(roles);
      this.setState({ users, roles });
    }
  };

  componentWillMount() {
    this.initColumn();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, isShow, roles } = this.state;
    const user = this.user;
    const title =
      <Button
        type='primary'
        onClick={this.showAdd}
      >
        ユーザ追加
      </Button>;

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
        <Modal
          title={user ? 'ユーザ編集' : 'ユーザ追加'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false })
            this.form.resetFields()
          }}
        >
          <UserForm
            setForm={(form) => {
              this.form = form;
            }}
            user={user}
            roles={roles} />
        </Modal>
      </Card>
    );
  }
}
