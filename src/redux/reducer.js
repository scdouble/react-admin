/**
 * reducerの関数のモジュール：現在のStateと指定したアクションをもとに新しいStateを返す
 */
import { combineReducers } from 'redux';
import { DECREMENT, INCREMENT } from './action-types';

/**
 * countの状態と管理する
 */
function count(state = 0, action) {
  console.log('count()', state, action);
  switch (action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}

const initUser = {};
// userの状態を管理するReducer
function user(state = initUser, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// reducer関数を受け取り、新しい集合されたReducerをReturn
// 集合されたReducerのStateの構造は？
/**
 * {
 *  count:2,
 *  user: {}
 * }
 */
export default combineReducers({
  count: count,
  user: user,
});
