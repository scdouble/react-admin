/** ajax のFunctionのモジュール
 * axiosをラップしている
 * ReturnはPromiseオブジェクト
 * 1.ajaxのリクエストエラーを統合して処理：外側に新しいPromise作成してAjaxをラップする。
 * エラーが起きたときにRejectせずにエラーメッセージを表示する、
 * 2. ajaxリクエスト後のresolveはresponseではなく、response.data
 */

import axios from "axios";

import { message } from "antd";

export default function ajax(url, data = {}, type = "GET") {
  // executor
  return new Promise((resolve, reject) => {
    let promise;
    // ajaxリクエストを実行
    if (type === "GET") {
      // GETリクエスト
      promise = axios.get(url, {
        // config　object
        params: data,
      });
    } else {
      // POSTリクエスト
      promise = axios.post(url, data);
    }
    // 成功ならresolve(value)を実行
    promise
      .then((response) => {
        resolve(response.data);

        // 失敗なら　rejectを使わない(reason)で、　Errorメッセージを表示
      })
      .catch((error) => {
        message.error("HTTPリクエスト失敗: " + error.message);
      });
  });
}
