/**アプリの中で使う全てのAPIのFunctionのモジュール
 * APIドキュメントを参照して書く
 * FunctionのReturnはPromise
*/
import ajax from "./ajax";
// export function reqLogin(username, password) {
//   return ajax("/login", { username, password }, 'POST')
// }

// Login
/***
 *
 * @returns promise
 */
export const reqLogin = (username, password) => ajax("/login", { username, password }, 'POST')

// ユーザ追加
export const reqAddUser = (userObj) => ajax('/manage/user/add', userObj, 'POST')
