import * as React from 'react';

import Header             from './Header/HeaderConnected';
import Hero               from './Hero/HeroConnected';
import Typogr             from './Typogr/TypogrConnected';
import Target             from './Target/TargetConnected';
import MonthInClouds      from './MonthInClouds/MonthInCloudsConnected';
import StatPrevDates      from './PrevDates/PrevDatesConnected';
import StatMinMax         from './MinMax/MinMaxConnected';
import DayInYearScale     from './DayInYearScale/DayInYearScaleConnected';
import StatTotalEvenOdd   from './TotalEvenOdd/TotalEvenOddConnected';
import StatAround         from './Around/AroundConnected';
import CurrDayAbbr        from './CurrDayAbbr/CurrDayAbbrConnected';
import StatNumFreqInyear  from './NumFreqInYear/NumFreqInYearConnected';
import StatJdan           from './Jdan/JdanConnected';
import StatDayInMonth     from './DayInMonthHistogram/DayInMonthHistogramConnected';
import StatSeasons        from './Seasons/SeasonsConnected';
import StatHalfYear       from './HalfYear/HalfYearConnected';
import StatSquare         from './Square/SquareConnected';
import StatSlash          from './Slashes/SlashesConnected';
import SumColumns         from './SumColumns/SumColumnsConnected';
import StatYearDaysSorted from './YearGradient/YearGradientConnected';
import StatTower          from './Tower/TowerConnected';
import News               from './News/News';
import Footer             from './Footer/Footer';

import './SwoPage.scss';

export default class SwoPage extends React.Component<any, any> {
  public componentDidMount() {
    const TOTAL_LOADING_ANIMATIONS_DURATION = 2000;
    const loader = document.getElementById('pageLoader');
    const root = document.getElementById('root');
    loader.classList.remove('is-visible');
    root.classList.add('is-visible');
    setTimeout(() => {
      loader.style.display = 'none';
      root.classList.remove('is-pageLoaderActive');
    }, TOTAL_LOADING_ANIMATIONS_DURATION);
  }

  public render() {
    return (
      <main className="SwoPage">
        <Hero />
        <MonthInClouds />
        <Target />
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
        <Header />
        <Footer />
      </main>
    );
  }
}
