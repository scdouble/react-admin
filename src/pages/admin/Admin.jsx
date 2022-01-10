import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';

import Home from '../home/Home'
import Product from '../product/Product'
import Category from '../category/Category'
import User from '../user/User'
import Role from '../role/Role'
import Bar from '../charts/Bar'
import Pie from '../charts/Pie'
import Line from '../charts/Line'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const user = memoryUtils.user

    // メモリにログインのユーザデータがなければ
    if (!user || !user._id) {
      // loginに遷移
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: '100%', width: '100%', minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}>
          <LeftNav showTitle={this.state.collapsed} />
        </Sider>
        <Layout>
          <Header> Header </Header>
          <Content style={{ backgroundColor: 'white', margin: '20px' }}>
            <Switch>
              <Route path="/product" component={Product} />
              <Route path="/category" component={Category} />
              <Route path="/user" component={User} />
              <Route path="/role" component={Role} />
              <Route path="/home" component={Home} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>Hello World
            Forever!</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
