import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tree } from 'antd';

import menuList from '../../config/menuConfig'; //menulistは別名でもよい

const { Item } = Form;
const { TreeNode } = Tree;

export default class AuthForm extends PureComponent {
  static propTypes = {
    role: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { menus } = this.props.role;
    this.state = {
      checkedKeys: menus,
    };
  }

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>,
      );
      return pre;
    }, []);
  };

  /**
   * 親コンポーネントにステートのデータを渡す
   * */
  getMenus = () => {
    return this.state.checkedKeys;
  };

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList);
  }

  /**
   * 新しいroleを元にcheckedKeysを更新 コンポーネントが新しいPropsを受け取る時に実行
   * @param nextProps
   * @param nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
  const menus = nextProps.role.menus
    this.setState({
      checkedKeys:menus
    })
  }


  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    return (
      <Form {...formItemLayout}>
        <Item label="ロール名">
          <Input value={role.name} disabled={true} />
        </Item>
        <Tree checkable defaultExpandAll={true} checkedKeys={checkedKeys} onCheck={this.onCheck}>
          <TreeNode title="アプリ全体" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}
