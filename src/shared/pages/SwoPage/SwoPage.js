// @flow
import React, {Component} from 'react';

import Header from './components/Header/Header';

export default class SwoPage extends Component {
  render(): React$Element<any> {
    return (
      <div className="SwoPage">
        <Header/>
        <footer>hello world</footer>
      </div>
    );
  }
}
