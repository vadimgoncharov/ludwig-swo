// @flow
import React, {Component} from 'react';
import classNames from 'classnames';

import './DayInYearScale.scss';

export default class DayInYearScale extends Component {
  getDaysInYear(year: number): number {
    let days: number = 0;

    for(let month = 1; month <= 12; month++) {
      days += (new Date(year, month, 0).getDate());
    }

    return days;
  }

  getDayInYear(year: number, month: number, day: number): number {
    const end: Date = new Date(year, month, day);
    const start: Date = new Date(end.getFullYear(), 0, 0);
    const diff: number = end - start;
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayInYear: number = Math.floor(diff / oneDay);

    return dayInYear;
  }

  renderScale(daysInYear: number, dayInYear: number): React$Element<any> {
    const content: React$Element<any>[] = [];

    for (let i: number = 0; i < daysInYear; i++) {
      const className = classNames('DayInYearScale-item', {'is-selected': i === dayInYear});
      content.push(
        <li className={className} key={i} />
      );
    }
    return (
      <ol className="DayInYearScale-items">
        {content}
      </ol>
    );
  }

  render(): React$Element<any> {
    const date: string = '7 сентября';
    const currYear = (new Date()).getFullYear();
    const daysInYear = this.getDaysInYear(currYear);
    const dayInYear = this.getDayInYear(currYear, 9-1, 7);

    return (
      <div className="DayInYearScale">
        <div className="DayInYearScale-title">{date} в году:</div>
        {this.renderScale(daysInYear, dayInYear)}
      </div>
    );
  }
}
