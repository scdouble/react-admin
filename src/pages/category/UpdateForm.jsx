import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'antd';
const { Item } = Form;

class UpdateForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };
  componentDidMount() {
    // formを親に渡す
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;
    return (
      <Form>
        <Item label="カテゴリー名">
          {getFieldDecorator('categoryName', {
            initialValue: categoryName,
            rules: [{ required: true, message: 'カテゴリー名を入力してください' }],
          })(<Input placeholder="変更後のカテゴリー名を入力してください" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UpdateForm);
