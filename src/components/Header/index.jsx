import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button } from "antd";

import { reqWeather } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import menuList from "../../config/menuConfig";
import "./index.css";

// ヘッダー部のComponent
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weatherIcon: "",
    weatherSummary: "",
  };

  getTime = () => {
    this.timer = setInterval(() => {
      this.setState({ currentTime: formateDate(Date.now()) });
    }, 1000);
  };

  getWeather = async () => {
    const result = await reqWeather("35.5299", "139.7024");
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
          return cItem.key === path;
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
      title: "ログアウト",
      content: "ログアウトします。よろしいですか？",
      onOk: () => {
        console.log("OK");
        storageUtils.removeUser();
        memoryUtils.user = {};
        this.props.history.replace("/login");
      },
      onCancel() {
        console.log("");
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
    const username = memoryUtils.user.username;
    const { currentTime, weatherIcon, weatherSummary } = this.state;
    const title = this.getTitle();

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
            <img
              src={`https://darksky.net/images/weather-icons/${weatherIcon}.png`}
              alt=""
            />
            <span>{weatherSummary}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
