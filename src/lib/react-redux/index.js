/**
 * react-reduxライブラリーのモジュール
 */
import React from 'react';
import PropTypes from 'prop-types';

// contextを使ってcontainerコンポーネントにStoreを提供する
export class Provider extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired, // storeを受け取ることを宣言
  };

  // contextのデータとタイプを宣言
  static childContextTypes = {
    store: PropTypes.object,
  };

  // 宣言している子コンポーネントにContextをあげる
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return (
      // providerの全部の子Node
      this.props.children
    );
  }

}

/**
 * connect高階関数：mapStateToPropsとmapDispatchToPropsを受け取る
 * return 高階コンポーネントを返す
 *          UIコンポーネントを受け取る高階関数
 */
export function connect(mapStateToProps, mapDispatchToProps) {
  // 高階コンポーネントを返す
  return function(UIComponent) {
    // Containerコンポーネントを返す
    return class ContainerComponent extends React.Component {

      //　受け取るContextの名前とタイプを宣言する
      static contextTypes = {
        store: PropTypes.object,
      };

      constructor(props, context) {
        super(props);
        console.log('container component  constructor()', context.store);

        const { store } = context;
        // 関数じゃないプロパティのを得る
        const stateProps = mapStateToProps(store.getState());

        // 関数じゃないプロパティをcontainerコンポーネントの状態にする
        this.state = { ...stateProps };

        let dispatchProps;
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else {
          dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            const actionCreator = mapDispatchToProps[key];
            pre[key] = (...args) => {
              return store.dispatch(actionCreator(...args));
            };
            return pre
          }, {});
        }

        //関数プロパティを得る
        this.dispatchProps = dispatchProps;

        // storeのState変化の監視をバインド
        store.subscribe(() => {
          // store内部の状態が変わった
          // container componentを更新して→UIComponentを更新
          this.setState({ ...mapStateToProps(store.getState()) });
        });
      }


      render() {
        return (
          <UIComponent {...this.state} {...this.dispatchProps} />
        );
      }
    };
  };
}
