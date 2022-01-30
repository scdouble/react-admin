/*
 * エントリーJSファイル
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider } from 'react-redux';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
import App from './App';

// local storageの中Userを取得して、メモリに保存する
// const user = storageUtils.getUser();
// memoryUtils.user = user;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
