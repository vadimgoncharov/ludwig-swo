import * as React from 'react';

import Header         from './containers/Header';
import Hero           from './containers/Hero';
import StatTotal      from './containers/StatTotal';
import StatPrevDates  from './containers/StatPrevDates';
import StatMinMax     from './containers/StatMinMax';
import DayInYearScale from './containers/DayInYearScale';
import StatTotalEvenOdd from './containers/StatTotalEvenOdd';
import StatJdan       from './containers/StatJdan';
import Footer         from './components/Footer';

import './SwoPage.scss';

export default class SwoPage extends React.Component<any, any> {
  public render() {
    return (
      <div className="SwoPage">
        <Header />
        <Hero />
        <StatTotal />
        <StatPrevDates />
        <StatMinMax />
        <DayInYearScale />
        <StatTotalEvenOdd />
        <StatJdan />
        <Footer />
      </div>
    );
  }
}
