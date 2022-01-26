import React, { Component } from 'react';
import { reqAddRole, reqRoles, reqUpdateRole } from '../../api';
import { Button, Card, message, Modal, Table } from 'antd';
import AddRole from './AddRole';
import AuthForm from './AuthForm';
import memoryUtils from '../../utils/memoryUtils';
import { formateDate } from '../../utils/dateUtils';
import storageUtils from '../../utils/storageUtils';
// const data = [
//   {
//     _id: 1,
//     name: 'test',
//     auth_time: '123',
//     auth_name: 1,
//   },
// ];
export default class Role extends Component {
  constructor(props) {
    super(props);

    this.auth = React.createRef();
    this.state = {
      roles: [],
      selectedRole: {}, //選択した行
      isShowAdd: false,
      confirmLoading: false,
      isShowAuth: false,
    };
  }

  initColumns = () => {
    this.columns = [
      { title: 'ロール名', dataIndex: 'name' },
      {
        title: '作成日', dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time),
      },
      {
        title: '権限設定日', dataIndex: 'auth_time',
        render: formateDate,

      },
      { title: '権限設定者', dataIndex: 'auth_name' },
    ];
  };

  onRow = (role) => {
    return {
      onClick: (event) => {
        console.log('clicked', role);
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
          this.setState((state, props) => ({
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

  updateRole = async () => {
    const role = this.state.selectedRole;
    // 最新のmenus
    role.menus = this.auth.current.getMenus();
    role.auth_time = Date.now();
    role.auth_name = memoryUtils.user.username;
    // APIに更新リクエスト
    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      // this.getRoles()
// 現在更新したRoleが自分が所属しているRoleなら再度ログインさせる
      if (role._id === memoryUtils.user.role_id) {
        memoryUtils.user = {};
        storageUtils.removeUser();
        this.props.history.replace('/login');
        message.info('ロールの権限が変更になりました。再度ログインしてください');
      } else {
        message.success('権限の設定が完了しました');

        this.setState({
          roles: [...this.state.roles],
        });
        this.setState({
          isShowAuth: false,
        });
      }

    } else {
      message.error('権限の設定が失敗しました');

    }
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
    const { roles, selectedRole, isShowAdd, isShowAuth, confirmLoading } = this.state;
    const title = (
      <span>
        <Button
          type='primary'
          onClick={() => {
            this.setState({ isShowAdd: true });
          }}
        >
          ロール追加
        </Button>
        &nbsp;
        <Button
          type='primary'
          disabled={!selectedRole._id}
          onClick={() => {
            this.setState({ isShowAuth: true });
          }}
        >
          権限設定
        </Button>
      </span>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [selectedRole._id],
            onSelect: (role) => {
              this.setState({ selectedRole: role });
            },
          }}
          rowKey='_id'
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
        />
        <Modal
          title='ロールを追加'
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

        <Modal
          title='権限設定'
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false });
          }}
          confirmLoading={confirmLoading}
        >
          <AuthForm ref={this.auth} role={selectedRole} />
        </Modal>
      </Card>
    );
  }
}
