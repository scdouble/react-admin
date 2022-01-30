import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Select } from 'antd';
const { Option } = Select;
const { Item } = Form;

class AddForm extends Component {
  static propTypes = {
    categoryList: PropTypes.array.isRequired, //トップレベルのカテゴリーのリスト
    parentId: PropTypes.string.isRequired, //親コンポーネントのID
  };

  componentDidMount() {
    // formを親に渡す
    this.props.setForm(this.props.form);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryList, parentId } = this.props;
    return (
      <Form>
        <Item label="カテゴリー">
          {getFieldDecorator('parentId', {
            initialValue: parentId,
          })(
            <Select>
              <Option value="0">トップレベルの分類</Option>
              {categoryList.map((category) => {
                return (
                  <Option value={category._id} key={category._id}>
                    {category.name}
                  </Option>
                );
              })}
            </Select>,
          )}
        </Item>

        <Item label="カテゴリー名">
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: 'カテゴリー名を入力してください' }],
          })(<Input placeholder="カテゴリー名を入力してください" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddForm);
