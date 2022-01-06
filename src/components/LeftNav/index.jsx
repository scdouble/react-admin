import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import logo from '../../assets/logo.png'

import { Menu, Icon, Button } from 'antd';

const { SubMenu } = Menu;

//左ナビゲーションバーのコンポーネント
export default class LeftNav extends Component {


  render() {
    return (
      <div>
        <div className='left-nav' >
          <Link to="/" className='left-nav-header'>
            <img src={logo} alt="logo" />
            <h1>Title</h1>
          </Link>
        </div>

        <Menu
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>Product</span>
              </span>
            }
          >
            <Menu.Item key="5"><Icon type="mail" />Category管理</Menu.Item>
            <Menu.Item key="6"><Icon type="mail" />Product管理</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>

        </Menu>

      </div>
    )
  }
}
