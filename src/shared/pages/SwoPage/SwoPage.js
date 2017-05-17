// @flow
import React, {Component} from 'react';

import Header         from './containers/Header';
import Hero           from './containers/Hero';
import StatTotal      from './containers/StatTotal';
import StatPrevDates  from './containers/StatPrevDates';
import StatMinMax     from './components/StatMinMax';
import DayInYearScale from './components/DayInYearScale';
import StatJdan       from './components/StatJdan';
import Footer         from './components/Footer';

import './SwoPage.scss';

export default class SwoPage extends Component {
  render(): React$Element<any> {
    return (
      <div className="SwoPage">
        <Header />
        <Hero />
        <StatTotal />
        <StatPrevDates />
        <StatMinMax />
        <DayInYearScale />
        <StatJdan />
        <Footer />
      </div>
    );
  }
}
