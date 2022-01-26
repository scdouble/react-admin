import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {count:0}
    this.numberRef = React.createRef();
  }
  increment = () => {
    const number = this.numberRef.current.value * 1;
    this.setState((state) => {
      return { count: state.count + number };
    });
  };

  decrement = () => {
    const number = this.numberRef.current.value * 1;
    this.setState((state) => {
      return { count: state.count - number };
    });
  };

  incrementIfOdd = () => {
    const number = this.numberRef.current.value * 1;

    if (this.state.count % 2 === 1) {
      this.setState((state) => {
        return { count: state.count + number };
      });
    }
  };

  incrementAsync = () => {
    const number = this.numberRef.current.value * 1;
    setTimeout(() => {
      this.setState((state) => {
        return { count: state.count + number };
      });
    }, 1000);
  };

  render() {
    const count = this.state.count;

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
