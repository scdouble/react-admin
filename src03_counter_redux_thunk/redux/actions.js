/**
 * Actionのファクトリー関数(Factory Creators)を複数含むモジュール
 */

import { DECREMENT, INCREMENT } from './action-types';

// export function increment(number){
//   return { type: 'INCREMENT', data: number }
// }

// 増加のAction // オブジェクトを返す
export const increment = (number) => ({ type: INCREMENT, data: number });
// マイナスするAction
export const decrement = (number) => ({ type: DECREMENT, data: number });

// 非同期型の増加するAction　 // 関数を返す
export const incrementAsync = (number) => {
  // setTimeout(() => {
  //   return { type: DECREMENT, data: number };
  // }, 1000);
  return (dispatch) => {
    // 1.関数の中で非同期処理を行う、SetTimeOut Ajax　Promiseなどなど
    setTimeout(() => {
      // 2.非同期型処理完了後に同期型処理を発砲する
      dispatch(increment(number));
    }, 1000);
  };
};
