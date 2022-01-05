import React, { Component } from 'react';
import './Login.css'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';


/* loginのrouteコンポーネント*/
class Login extends Component {


  //パスワードに対してカスタマイズのValidateを使う
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('password is required')
    } else if (value.length < 4) {
      callback('password length < 4')
    }
    else if (value.length > 12) {
      callback("password length > 12")
    }
    else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("invalid password")
    }
    else {
      callback()
    }
    // callback() validate OK
    // callback('xxxx') // validate NG 失敗のメッセージはパラメータに指定する
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // formオブジェクトを取得
    const { form } = this.props
    // formのInputした値を取得
    // const values = form.getFieldsValue()
    // console.log('handleSubmit', values)

    // form全体のInputに対してValidateする
    form.validateFields((err, values) => {
      if (!err) {
        // todo
        console.log("Send Ajax request", values);
        // console.log('Received values of form: ', values);
      } else {
        console.log("Login Input Validation Failed");
      }
    });


  }

  render() {

    // formからgetFieldDecoratorを取得
    const { getFieldDecorator } = this.props.form

    return (
      <div className="login">

        <header className="login-header">
          {/*<img src={logo} alt=""/>*/}
          <h1>Back Office Management System</h1>
        </header>

        <section className="login-content">

          <h2>User Login</h2>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', { // オブション
                  // 声明式のValidation。
                  rules: [
                    { required: true, whitespace: true, message: 'Username is required.' },
                    { min: 4, message: 'Username must have 4 letters at least.' },
                    { max: 12, message: 'Username can not over 12 letters.' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username must be a combination of number or alphabet.' },
                  ]
                })(
                  <Input
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
                )
              }
            </Form.Item>

            <Form.Item>
              {
                getFieldDecorator('password', {
                  // validatorを使ってValidation
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
                )
              }

            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit"
                className="login-form-button">
                ログイン
              </Button>
            </Form.Item>

          </Form>

        </section>
      </div>
    );
  }
}

/*
High order Function
High order Component
 */

// Formをラップして新しいFormコンポーネントを作成する　Form(Login)
// Form(Login)はprops formを渡す
const WarpLogin = Form.create()(Login)
export default WarpLogin;
