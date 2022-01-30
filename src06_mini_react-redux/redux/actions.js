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

