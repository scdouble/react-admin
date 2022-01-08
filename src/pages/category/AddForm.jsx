import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select;
const { Item } = Form

class AddForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form >
        <Item label="カテゴリー">
          {
            getFieldDecorator('parentId', {
              initialValue: '0'
            })(
              <Select>
                <Option value='0'>トップレベルの分類</Option>
                <Option value='1'>コンピューター</Option>
                <Option value='2'>図書</Option>
              </Select>
            )
          }
        </Item>

        <Item label="カテゴリー名">
          {
            getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: "カテゴリー名を入力してください"
              }]
            })(
              <Input placeholder='カテゴリー名を入力してください' />
            )
          }
        </Item>

      </Form>
    )
  }

}

export default Form.create()(AddForm)
