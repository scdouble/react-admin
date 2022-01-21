import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'antd';
const { Item } = Form;

class AddRole extends Component {
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
      labelCol:{span:4},
      wrapperCol:{span:20}
    }

    return (
      <Form>
        <Item label="ロール名" {...formItemLayout}>
          {getFieldDecorator('roleName',{
            rules: [{ required: true, message: 'ロール名を入力してください' }],
          })(<Input placeholder="ロール名を入力してください" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddRole);
