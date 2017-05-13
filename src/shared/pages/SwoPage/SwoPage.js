// @flow
import React, {Component} from 'react';

import Header     from './components/Header/Header';
import Hero       from './components/Hero/Hero';
import StatTotal  from './components/StatTotal/StatTotal';
import StatMonths from './components/StatMonths/StatMonths';

import './SwoPage.scss';

export default class SwoPage extends Component {
  render(): React$Element<any> {
    return (
      <div className="SwoPage">
        <Header/>
        <Hero />
        <StatTotal />
        <StatMonths />
      </div>
    );
  }
}
