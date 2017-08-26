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
import apiResponseConverter from 'shared/services/apiResponseConverter';
import SwoPage from 'shared/pages/SwoPage/SwoPage';

import {TStats} from 'shared/types/Stats';

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

const fetchStatsFromAPI = () => {
  API.getStats().then((stats) => {
    runApp(stats);
  }).catch((error) => {
    console.error(error);
  });
};

const runApp = (stats: TStats) => {
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
};

let statsFromInitialData;
try {
  const initialData = (window as any).__INITIAL_DATA__;
  if (initialData) {
    statsFromInitialData = JSON.parse(initialData);
    statsFromInitialData = apiResponseConverter(statsFromInitialData);
    delete (window as any).__INITIAL_DATA__;
  }
} catch (error) {
  console.error(error);
}

if (statsFromInitialData) {
  runApp(statsFromInitialData);
} else {
  fetchStatsFromAPI();
}

if (module.hot) {
  module.hot.accept('../shared/pages/SwoPage/SwoPage', () => {
    const NextApp = require('../shared/pages/SwoPage/SwoPage').default;
    render(NextApp);
  });
}
