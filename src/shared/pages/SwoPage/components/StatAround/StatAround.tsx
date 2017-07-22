import * as React from 'react';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import * as utils from 'shared/utils';
import navSectionData from './navSectionData';

import {TStatAround} from 'shared/types/StatAround';

import './StatAround.scss';

type TProps = {
  isFetching: boolean,
  statAround: TStatAround,
};

export default class StatAround extends React.Component<TProps, any> {
  public props: TProps;

  public render() {
    return (
      <section className="StatAround">
        <SectionContent navSection={navSectionData}>
          <div className="StatAround-title">{navSectionData.title}</div>
          {this.renderArrows()}
          {this.renderValues()}
        </SectionContent>
      </section>
    );
  }

  private renderArrows() {
    const {yesterday, today, tomorrow} = this.props.statAround;
    const min = this.getMinValue();
    const max = this.getMaxValue();

    const yesterdayArrowClassName = this.getArrowClassName(yesterday.value, min, max);
    const todayArrowClassName     = this.getArrowClassName(today.value, min, max);
    const tomorrowArrowClassName  = this.getArrowClassName(tomorrow.value, min, max);

    return (
      <div className="StatAround-arrows">
        <span className={yesterdayArrowClassName}>&larr;</span>
        <span className={todayArrowClassName}>&#8212;</span>
        <span className={tomorrowArrowClassName}>&rarr;</span>
      </div>
    );
  }

  private renderValues() {
    const {yesterday, today, tomorrow} = this.props.statAround;
    const yesterdayValueFormatted = utils.format.formatValueToTimesWithPluralize(yesterday.value);
    const todayValueFormatted     = utils.format.formatValueToTimesWithPluralize(today.value);
    const tomorrowValueFormatted  = utils.format.formatValueToTimesWithPluralize(tomorrow.value);

    return (
      <div className="StatAround-values">
        Сайт откроется <span className="StatAround-value">вчера&nbsp;&larr; {yesterdayValueFormatted}</span>,{' '}
        <span className="StatAround-value">сегодня&nbsp;&#8212; {todayValueFormatted}</span>,{' '}
        <span className="StatAround-value">завтра&nbsp;&rarr; {tomorrowValueFormatted}</span>
      </div>
    );
  }

  private getArrowClassName(value: number, min: number, max: number): string {
    let className = 'StatAround-arrow';
    if (value === max) {
      className += ' is-max';
    }
    else if (value === min) {
      className += ' is-min';
    }
    else {
      className += ' is-normal';
    }
    return className;
  }

  private getMaxValue(): number {
    const {yesterday, today, tomorrow} = this.props.statAround;
    return Math.max(
      yesterday.value,
      today.value,
      tomorrow.value,
    );
  }

  private getMinValue(): number {
    const {yesterday, today, tomorrow} = this.props.statAround;
    return Math.min(
      yesterday.value,
      today.value,
      tomorrow.value,
    );
  }
}
