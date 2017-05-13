/* global document, module, require */

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import SwoPage from '../shared/pages/SwoPage/SwoPage';

import '../shared/global/global.scss';

const render = Component => {
  return ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(SwoPage);

if (module.hot) {
  module.hot.accept('../shared/pages/SwoPage/SwoPage', () => {
    const NextApp = require('../shared/pages/SwoPage/SwoPage').default;
    render(NextApp);
  });
}
