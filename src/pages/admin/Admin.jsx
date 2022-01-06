import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/LeftNav';
import Header from '../../components/Header';

const { Footer, Sider, Content } = Layout;
class Admin extends Component {


  render() {
    const user = memoryUtils.user

    // メモリにログインのユーザデータがなければ
    if (!user || !user._id) {
      // loginに遷移
      return <Redirect to="/login" />
    }
    return (
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header> Header </Header>
          <Content style={{backgroundColor:'white'}}>Content</Content>
          <Footer style={{textAlign:'center', color:'#cccccc'}}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Admin;
