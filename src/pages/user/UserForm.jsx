import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Select } from 'antd';

const { Item } = Form;

/**
 * ユーザ追加、もしくは削除のForm
 */
class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object,

  };

  componentDidMount() {
    // formを親に渡す
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles } = this.props;
    const user = this.props.user || {};
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form {...formItemLayout}>
        <Item label='ユーザネーム'>
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [{ required: true, message: 'ユーザネームを入力してください' }],
          })(<Input placeholder='ユーザネームを入力してください' />)}
        </Item>
        {user._id ? null : <Item label='パスワード'>
          {getFieldDecorator('password', {
            initialValue: user.password,
            rules: [{ required: true, message: 'passwordを入力してください' }],
          })(<Input type='password' placeholder='passwordを入力してください' />)}
        </Item>}
        <Item label='メールアドレス'>
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [{ required: true, message: 'emailを入力してください' }],
          })(<Input placeholder='emailを入力してください' />)}
        </Item>
        <Item label='ロール'>
          {getFieldDecorator('role_id', {
            initialValue: user.role_id,
            rules: [{ required: true, message: 'ロールを選択してください' }],
          })(<Select placeholder='ロールを選択してください'>
            {
              roles.map((role) => {
                return (
                  <Select.Option key={role._id} value={role._id}>
                    {role.name}
                  </Select.Option>
                );

              })
            }
          </Select>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);
