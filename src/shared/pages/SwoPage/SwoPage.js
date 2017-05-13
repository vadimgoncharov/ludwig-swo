// @flow
import React, {Component} from 'react';

import Header from './components/Header/Header';
import Hero   from './components/Hero/Hero';

import './SwoPage.scss';

export default class SwoPage extends Component {
  render(): React$Element<any> {
    return (
      <div className="SwoPage">
        <Header/>
        <Hero />
      </div>
    );
  }
}
