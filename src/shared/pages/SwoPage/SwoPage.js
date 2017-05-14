// @flow
import React, {Component} from 'react';

import Header         from './components/Header';
import Hero           from './components/Hero';
import StatTotal      from './components/StatTotal';
import StatMonths     from './components/StatMonths';
import StatMinMax     from './components/StatMinMax';
import DayInYearScale from './components/DayInYearScale';
import StatJdan       from './components/StatJdan';
import Footer         from './components/Footer';

import './SwoPage.scss';

export default class SwoPage extends Component {
  render(): React$Element<any> {
    return (
      <div className="SwoPage">
        <Header/>
        <Hero />
        <StatTotal />
        <StatMonths />
        <StatMinMax />
        <DayInYearScale />
        <StatJdan />
        <Footer />
      </div>
    );
  }
}
