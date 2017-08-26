import * as React from 'react';

import Header         from './containers/Header';
import Hero           from './containers/Hero';
import Typogr         from './containers/Typogr';
import Target         from './containers/Target';
import MonthInClouds  from './containers/MonthInClouds';
// import StatTotal      from './containers/StatTotal';
import StatPrevDates  from './containers/StatPrevDates';
import StatMinMax     from './containers/StatMinMax';
import DayInYearScale from './containers/DayInYearScale';
import StatTotalEvenOdd from './containers/StatTotalEvenOdd';
import StatAround     from './containers/StatAround';
import CurrDayAbbr    from './containers/CurrDayAbbr';
import StatNumFreqInyear from './containers/StatNumFreqInYear';
import StatJdan       from './containers/StatJdan';
import StatDayInMonth from './containers/StatDayInMonth';
import StatSeasons    from './containers/StatSeasons';
import StatHalfYear   from './containers/StatHalfYear';
import StatSquare     from './containers/StatSquare';
import StatSlash      from './containers/StatSlash';
import SumColumns     from './containers/SumColumns';
import StatYearDaysSorted from './containers/StatYearDaysSorted';
import StatTower      from './containers/StatTower';
import News           from './components/News';
import Footer         from './components/Footer';

import './SwoPage.scss';

export default class SwoPage extends React.Component<any, any> {
  public render() {
    return (
      <div className="SwoPage">
        <Header />
        <Hero />
        <MonthInClouds />
        <Target />
        {/*<StatTotal />*/}
        <StatPrevDates />
        <StatMinMax />
        <DayInYearScale />
        <StatTotalEvenOdd />
        <StatAround />
        <CurrDayAbbr />
        <StatNumFreqInyear />
        <StatDayInMonth />
        <StatSeasons />
        <StatHalfYear />
        <StatSquare />
        <StatSlash />
        <SumColumns />
        <StatYearDaysSorted />
        <Typogr />
        <StatTower />
        <StatJdan />
        <News />
        <Footer />
      </div>
    );
  }
}
