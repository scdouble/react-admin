/**
 * reduxのStore
 */
import { createStore } from '../lib/redux';
import reducer from './reducer';
export default createStore(reducer); // storeオブジェクトを作成する時にはじめにreducer()を利用→Stateの初期状態を得るため
