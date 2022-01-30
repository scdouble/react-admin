import { RECEIVE_USR, RESET_USER, SET_HEAD_TITLE, SHOW_ERROR_MSG } from './action-types';
import { reqLogin } from '../api';
import storageUtils from '../utils/storageUtils';

export const setHeadTitle = (title) => {
  return { type: SET_HEAD_TITLE, data: title };
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USR,
    user,
  };
};

export const showErrorMsg = (errorMsg) => {
  return {
    type: SHOW_ERROR_MSG,
    errorMsg,
  };
};

export const logout = () => {
  // localstorageの中のUser情報を削除
  storageUtils.removeUser();
  // アクションタイプを返す
  return {
    type: RESET_USER,

  };
};

/**
 * ログインの非同期型アクション
 */
export const login = (username, password) => {
  // 関数を返す
  return async dispatch => {
    // ajax
    const result = await reqLogin(username, password);
    // 成功したら同期型アクションを呼ぶ
    if (result.status === 0) {
      const user = result.data;
      // user情報をlocalの中に保存
      storageUtils.saveUser(user);
      console.log('dispatch::user');
      dispatch(receiveUser(user));
    } else {
      //  失敗した場合のAction
      const msg = result.msg;
      dispatch(showErrorMsg(msg));
    }
  };
};
