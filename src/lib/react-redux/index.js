/**
 * react-reduxライブラリーのモジュール
 */
import React from 'react';
import PropTypes from 'prop-types';

// コンテナのコンポーネントにStoreを提供する
export class Provider extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired, // storeを受け取ることを宣言
  };

  render() {
    return (
      <div>

      </div>
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
      render() {
        return (
          <UIComponent />
        );
      }
    };
  };
}
