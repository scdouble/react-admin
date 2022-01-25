/**
 * reducerの関数のモジュール：現在のStateと指定したアクションをもとに新しいStateを返す
 */
import { DECREMENT, INCREMENT } from './action-types';

/**
 * countの状態と管理する
 */
export default function count(state = 0, action) {
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
