/** ブラウザーのLocal storageを操作するためのモジュール */
import store from "store";

const USER_KEY = "user_key";

/** Javascript Nativeの localStorage.xxはブラウザによって
 * サポートしてない可能性があるので、サードパーティのstoreを使う
 * 書き方も簡潔になる
 * */
export default {
  // ユーザを保存
  saveUser(userObj) {
    //  localStorage.setItem(USER_KEY, JSON.stringify(userObj))
    store.set(USER_KEY, userObj);
  },

  // ユーザ情報を取得
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')  //null対処のため ||{}を追加
    return store.get(USER_KEY) || {};
  },

  // ユーザ情報を削除
  removeUser() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY);
  },
};
