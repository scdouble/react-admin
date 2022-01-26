import { combineReducers } from 'redux';
import storageUtils from '../utils/storageUtils';

const initTitle = 'ホーム';
function headTitle(state = initTitle, action) {
  switch (action.type) {
    default:
      return state;
  }
}

const initUser = storageUtils.getUser();
function user(state = initUser, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  headTitle,
  user,
});
