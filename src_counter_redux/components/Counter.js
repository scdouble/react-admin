import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { increment, decrement } from './redux/actions';

// UIコンポーネント 主にUIの表示とユーザとのインタラクティブ　
// コードの中にはReduxを操作すると関係するコードがない
export default class Counter extends Component {
  static propTypes = {
    // store: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    // this.state = {count:0}
    this.numberRef = React.createRef();
  }

  increment = () => {
    const number = this.numberRef.current.value * 1;
    // this.setState((state) => {
    //   return { count: state.count + number };
    // });

    // this.props.store.dispatch({ type: 'INCREMENT', data: number });

    // this.props.store.dispatch(increment(number));
    this.props.increment(number);
  };

  decrement = () => {
    const number = this.numberRef.current.value * 1;
    // this.setState((state) => {
    //   return { count: state.count - number };
    // });
    // this.props.store.dispatch(decrement(number));

    this.props.increment(number);
  };

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1;

    if (this.props.count % 2 === 1) {
      // this.setState((state) => {
      //   return { count: state.count + number };
      // });
      // this.props.store.dispatch(increment(number));
      this.props.increment(number);
    }
  };

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1;
    setTimeout(() => {
      // this.setState((state) => {
      //   return { count: state.count + number };
      // });
      // this.props.store.dispatch(increment(number));

      this.props.increment(number);
    }, 1000);
  };

  render() {
    //const count = this.state.count;
    // const count = this.props.store.getState();
    const count = this.props.count;

    return (
      <div>
        <p>click {count} times </p>
        <div>
          <select ref={this.numberRef} name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>increment if odd</button>
          <button onClick={this.incrementAsync}>increment async</button>
        </div>
      </div>
    );
  }
}
