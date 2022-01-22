import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Select } from 'antd';

const { Item } = Form;

/**
 * ユーザ追加、もしくは削除のForm
 */
class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired, //親コンポーネントのID
  };

  componentDidMount() {
    // formを親に渡す
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form {...formItemLayout}>
        <Item label='ユーザネーム'>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'ユーザネームを入力してください' }],
          })(<Input placeholder='ユーザネームを入力してください' />)}
        </Item>
        <Item label='パスワード'>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'passwordを入力してください' }],
          })(<Input type='password' placeholder='passwordを入力してください' />)}
        </Item>
        <Item label='メールアドレス'>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'emailを入力してください' }],
          })(<Input placeholder='emailを入力してください' />)}
        </Item>
        <Item label='ロール'>
          {getFieldDecorator('role_id', {
            initialValue: '2',
            rules: [{ required: true, message: 'ロールを選択してください' }],
          })(<Select>
            <Select.Option value='1'>
              a
            </Select.Option>
            <Select.Option value='2'>
              b
            </Select.Option>
          </Select>)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);
