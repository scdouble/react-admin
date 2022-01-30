import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';

import { reqWeather } from '../../api';
import { formateDate } from '../../utils/dateUtils';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import './index.css';
import {logout} from '../../redux/actions';


// ヘッダー部のComponent
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weatherIcon: '',
    weatherSummary: '',
  };

  getTime = () => {
    this.timer = setInterval(() => {
      this.setState({ currentTime: formateDate(Date.now()) });
    }, 1000);
  };

  getWeather = async () => {
    const result = await reqWeather('35.5299', '139.7024');
    this.setState({ weatherSummary: result.summary, weatherIcon: result.icon });
  };

  getTitle = () => {
    //現在のURLを取得
    const path = this.props.location.pathname;
    let title;
    menuList.forEach((item) => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        //　子メニュの中でItem,keyとPathを比較
        // 一致する項目があればTitleに表示
        const cItem = item.children.find((cItem) => {
          return path.indexOf(cItem.key) === 0;
        });
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  logOut = (e) => {
    Modal.confirm({
      title: 'ログアウト',
      content: 'ログアウトします。よろしいですか？',
      onOk: () => {
        this.props.logout()
        // this.props.history.replace('/login');
      },
      onCancel() {
        console.log('user canceled logout');
      },
    });
  };


  componentDidMount() {
    this.getTime();
    this.getWeather();
  }

  /**
   * コンポーネントがUnmountする前に実行
   */
  componentWillUnmount() {
    // Timerを止める
    clearInterval(this.timer);
  }

  render() {
    const { username } = this.props.user
    const { currentTime, weatherIcon, weatherSummary } = this.state;
    // const title = this.getTitle();
    const title = this.props.headTitle

    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome, {username}</span>
          <Button type="link" onClick={this.logOut}>
            ログアウト
          </Button>
        </div>

        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={`https://darksky.net/images/weather-icons/${weatherIcon}.png`} alt="" />
            <span>{weatherSummary}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    headTitle: state.headTitle,
    user: state.user
  }),
  {logout},
)(withRouter(Header));
