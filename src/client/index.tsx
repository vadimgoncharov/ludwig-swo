/* global document, module, require */

import 'es6-shim';

import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import {Provider}       from 'react-redux';
import {AppContainer}   from 'react-hot-loader';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware  from 'redux-thunk';

import reducers from '../shared/reducers';

import SwoPage from '../shared/pages/SwoPage/SwoPage';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
  ),
);

const render = (Component) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(SwoPage);

if (module.hot) {
  module.hot.accept('../shared/pages/SwoPage/SwoPage', () => {
    const NextApp = require('../shared/pages/SwoPage/SwoPage').default;
    render(NextApp);
  });
}
