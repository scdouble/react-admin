import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';
import NotFound from '../not-found/NotFound';

import Home from '../home/Home';
import Product from '../product/Product';
import Category from '../category/Category';
import User from '../user/User';
import Role from '../role/Role';
import Bar from '../charts/Bar';
import Pie from '../charts/Pie';
import Line from '../charts/Line';
import { connect } from 'react-redux';

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    console.log('Admin::render');
    // const user = memoryUtils.user;

    const { user } = this.props;

    // メモリにログインのユーザデータがなければ
    if (!user || !user._id) {
      // loginに遷移
      console.log('go to /login');
      return <Redirect to='/login' />;
    }
    return (
      <Layout style={{ minHeight: '100%', width: '100%' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <LeftNav showTitle={this.state.collapsed} />
        </Sider>
        <Layout>
          <Header> Header </Header>
          <Content style={{ backgroundColor: 'white', margin: '20px' }}>
            <Switch>
              <Redirect exact from='/' to='/home' />
              <Route path='/home' component={Home} />
              <Route path='/product' component={Product} />
              <Route path='/category' component={Category} />
              <Route path='/user' component={User} />
              <Route path='/role' component={Role} />
              <Route path='/charts/pie' component={Pie} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>Hello World Forever!</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  (state) => ({ user: state.user }),
  {},
)(Admin);
