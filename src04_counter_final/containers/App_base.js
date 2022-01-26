import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../redux/actions';

// コンテナ用のコンポーネント
// Connectを通じてUIコンポーネントを包む
// connectは高階関数　connectを実行した後returnは高階コンポーネント→UIコンポーネントを受け取り、コンテナコンポーネントを生成する
// コンテナコンポーネントはUIコンポーネントに特定の属性を伝える

// reduxの中のStateをUIコンポーネントの一般的なPropsにマッピングする
/**
 * @param  {} state
 */

function mapStateToProps(state) {
  return {
    count: state,// objectそのものじゃなくて、objectの中の属性をマッピングしている
  };
}

// dispatchが含まれているコードをUIコンポーネントの関数Propsにマッピングする
/**
 * @param  {} dispatch
 */

function mapDispatchToProps(dispatch) {
  return {
    increment: (number) => {
      return dispatch(increment(number));
    },
    decrement: (number) => {
      return dispatch(decrement(number));
    },
  };
}
export default connect(
  mapStateToProps, //一般のprops
  mapDispatchToProps, //関数のprops
)(Counter);
