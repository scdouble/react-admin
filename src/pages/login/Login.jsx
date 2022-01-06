import React, { Component } from 'react';
import './Login.css'
import logo from './images/logo.png'
import { Form, Input, Button, Typography } from 'antd';
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';

import { reqLogin } from '../../api' //export defaultであれば{}は書かなくても良い


/* loginのrouteコンポーネント*/
class Login extends Component {


  //パスワードに対してカスタマイズのValidateを使う
  validatePwd = (rules, value, callback) => {
    if (!value) {
      callback('パスワードを入力してください')
    } else if (value.length < 4 || value.length > 12) {
      callback('パスワードは4文字以上，12文字以下で入力してください')
    }
    else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("パスワードは半角英数のみで入力してください")
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
    form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values

        // Login処理
        const response = await reqLogin(username, password)
        console.log("ログインリクエスト成功", response.data);

        // console.log("Send Ajax request", values);
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

          <Typography.Title>
            Customize Title
          </Typography.Title>

        </header>

        <section className="login-content">

          {/* <h2><Icon type="home" /></h2> */}

          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', { // オブション
                  // 声明式のValidation。
                  rules: [
                    { required: true, whitespace: true, message: 'ユーザネームを入力してください.' },
                    { min: 4, message: 'ユーザネームは4文字以上，12文字以下で入力してください.' },
                    { max: 12, message: 'ユーザネームは4文字以上，12文字以下で入力してください.' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'ユーザネームは半角英数のみで入力してください' },
                  ],
                  initialValue: 'admin'
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
                  ],
                  initialValue: 'admin'

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
              <a href="http://localhost:3000" className='login-form-forgot'>
                パスワードをお忘れの方
              </a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                ログイン
              </Button>
            </Form.Item>

          </Form>

        </section>
        <section className='login-create-new-account' >
          <a href="http://">新しくアカウントを作成する</a>
        </section>

        <footer className='login-footer'>
          <img src={logo} alt="" />

        </footer>

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
