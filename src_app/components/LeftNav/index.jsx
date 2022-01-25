import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './index.css';
import logo from '../../assets/logo.png';

import { Icon, Menu } from 'antd';
import menuList from '../../config/menuConfig';
import memoryUtils from '../../utils/memoryUtils';

const { SubMenu } = Menu;

//左ナビゲーションバーのコンポーネント
class LeftNav extends Component {

  /**
   * 現在ログインしているユーザがメニューアイテムにアクセス権限があるかどうか
   */
  hasAuth = (item) => {
    const { key, isPublic } = item;
    const menus = memoryUtils.user.role.menus;
    const username = memoryUtils.user.username;


    /**
     * 1.現在のユーザーがadmin
     * 2.現在のユーザーのrole.menus.key情報の中にkeyが入っているか
     * 3.もしitemがpublic
     * 4.もし現在ログインのユーザはSubmenuのアクセス権限を付与
     */

    if (username === 'admin' || item.isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      return !!item.children.find(child => menus.indexOf(child.key) !== -1);
    } else {
      return false;
    }
  };
  /**
   * menuListから対応するMenuItemを生成する
   * @param {*} menuList
   */
  getMenuNodes = (menuList) => {
    const path = this.props.location.pathname;

    return menuList.map((item) => {

      if (this.hasAuth(item)) {


        // もし現在のユーザが対応するmenuがあれば、
        if (!item.children) {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          const cItem = item.children.find(
            (cItem) => path.indexOf(cItem.key) === 0,
          );
          if (cItem) {
            this.openkey = item.key;
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
              }
            >
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }

    });
  };

  //初回Renderの実行前に一回実行する。初めてRenderのためにデータを準備。同期型処理であることが必須
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // 現在のURLのPathを取得
    let path = this.props.location.pathname;
    console.log('render()', path);
    if (path.indexOf('/product') === 0) {
      //現在のリクエストがProductまたはProductの子ルール
      path = '/product';
    }
    // 開くべきメニューのKey
    const openKey = this.openkey;

    return (
      <div>
        <div className='left-nav'>
          <Link to='/' className='left-nav-header'>
            <img src={logo} alt='logo' />
            {<h1>Title</h1>}
          </Link>
        </div>

        <Menu
          mode='inline'
          theme='dark'
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

// withRouteはHOCで新しいComponentにRouterのHistory location match属性を与える
export default withRouter(LeftNav);
