import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
const { Option } = Select;
const { Item } = Form

class UpdateForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form >
        <Item label="カテゴリー名">
          {
            getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: "カテゴリー名を入力してください"
              }]
            })(
              <Input placeholder='変更後のカテゴリー名を入力してください' />
            )
          }
        </Item>

      </Form>
    )
  }

}

export default Form.create()(UpdateForm)
