/**
 * reducerの関数のモジュール：現在のStateと指定したアクションをもとに新しいStateを返す
 */
import { DECREMENT, INCREMENT } from './action-types';
import { combineReducers } from '../lib/redux';

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

function user(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

 export default combineReducers({
  count,
  user
})
