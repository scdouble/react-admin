/**
 * 自作reduxの主要モジュール
 */

/**
 * reducer関数を元にStateオブジェクトを返す
 * @param reducer
 * @returns {{getState: getState, dispatch: dispatch, subscribe: subscribe}}
 */
export function createStore(reducer) {

  // 内部のstateの状態を保存する。初期値はReducerを実行した返却値
  let state = reducer(undefined, { type: '@@redux/init' });

  // stateを監視するためのコールバック関数を補完するリスト
  const listeners = [];

  /**
   * 現在のStateを返す
   */
  function getState() {
    return state;
  }

  /**
   * Actionをディパッチして、reducerを起動して、新しいStateを生成
   * 1.reducerをトリガー
   * 2.新しいsたてを保存
   * 3.現在ある監視のコールバック関数を実行
   * @param action
   */
  function dispatch(action) {
    const newState = reducer(state, action);
    state = newState;
    listeners.forEach(listerner => listerner());
  }

  /**
   * stateの変更を監視するコールバック関数.
   * 一個のストアに複数の監視をバインドすることができる
   * @param listener
   */
  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

/**
 * 複数のReducer関数を統合して新しいReducerを返す。新しいReducerが管理する状態はobject
 * @param reducers
 * @returns {(function(*, *))|*}
 */
export function combineReducers(reducers) {

  // 新しいマージされたreducer関数
  // stateはマージされた状態

  // return (state = {}, action) => {
  //   const totalState = {};
  //   // reducersの中のreducer関数を実行して、子のStateを得て、新しいStateに詰め込む
  //   console.log(Object.keys(reducers));
  //   Object.keys(reducers).forEach(key => {
  //     totalState[key] = reducers[key](state[key], action);
  //   });
  //
  //   return totalState;
  // };

  return (state = {}, action) => {
    return Object.keys(reducers).reduce((totalState, key) => {
      totalState[key] = reducers[key](state[key], action);
      return totalState
    }, {});
  };
}
