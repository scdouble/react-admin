import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './lib/react-redux/index';
import App from './containers/App';

import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// //storeに	Stateを監視する
// store.subscribe(()=>{
//   //storeの中の状態が変化したときに自動で実施
//   // appを再度レンダリングする
//   ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// })
