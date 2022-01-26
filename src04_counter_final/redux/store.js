/**
 * reduxのStore
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // reduxで非同期処理をするためのミドルウェア

import reducer from './reducer';

export default createStore(reducer, applyMiddleware(thunk)); // storeオブジェクトを作成する時にはじめにreducer()を利用→Stateの初期状態を得るため
