/* global document, module, require */

import 'es6-shim';

import * as React       from 'react';
import * as ReactDOM    from 'react-dom';
import {Provider}       from 'react-redux';
import {AppContainer}   from 'react-hot-loader';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware  from 'redux-thunk';

import reducers from 'shared/reducers';
import * as API from 'shared/services/Api';
import * as mockData from 'shared/services/mockData';

import SwoPage from '../shared/pages/SwoPage/SwoPage';

let store;

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

API.getStats().then((stats) => {
  store = createStore(
    reducers,
    {
      stats: {
        isFetching: false,
        data: stats,
      },
    },
    applyMiddleware(
      thunkMiddleware,
    ),
  );
  render(SwoPage);
}).catch((error) => {
  console.error(error);
});


if (module.hot) {
  module.hot.accept('../shared/pages/SwoPage/SwoPage', () => {
    const NextApp = require('../shared/pages/SwoPage/SwoPage').default;
    render(NextApp);
  });
}
