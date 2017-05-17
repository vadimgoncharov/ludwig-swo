// @flow
import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';
import TWEEN from 'tween.js';

import {dateToDayMonth, getDaysInYear, getDayInYear} from 'shared/utils/date';
import type {StatTotal} from 'shared/reducers/stats';

import './DayInYearScale.scss';

type Props = {|
  isFetching: boolean,
  statTotal: StatTotal,
|};

type State = {|
  isAnimationInProgress: boolean,
  isInViewport: boolean,
  deltaDate: ?Date,
|};

export default class DayInYearScale extends Component<void, Props, State> {
  props: Props;
  state: State;
  state = {
    isAnimationInProgress: false,
    isInViewport: false,
    deltaDate: null
  };

  componentWillReceiveProps(nextProps: Props) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    this.startAnimation(oldDate, newDate);
  }

  startAnimation(oldDate: Date, newDate: Date) {
    this.setState({
      isAnimationInProgress: true,
    });
    const data = {time: oldDate.getTime()};
    const tween = new TWEEN.Tween(data);
    tween.to({time: newDate.getTime()}, this.state.isInViewport ? 4000 : 0);
    tween.onUpdate(() => {
      this.setState({
        deltaDate: new Date(data.time),
      });
    });
    tween.easing(TWEEN.Easing.Exponential.InOut);
    tween.start();
    this.animate();
  }

  animate = () => {
    if (!this.state.isAnimationInProgress) {
      return;
    }
    requestAnimationFrame(this.animate);
    TWEEN.update();
  };

  onWaypointEnter = () => {
    this.setState({
      isInViewport: true,
    });
  };

  onWaypointLeave = () => {
    this.setState({
      isInViewport: false,
    });
  };

  getDayInYear(year: number, month: number, day: number): number {
    const end: Date = new Date(year, month, day);
    const start: Date = new Date(end.getFullYear(), 0, 0);
    const diff: number = end - start;
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayInYear: number = Math.floor(diff / oneDay);

    return dayInYear;
  }

  renderScale(daysInYear: number, dayInYear: number): React$Element<any> {
    const content = [];

    for (let i: number = 0; i < daysInYear; i++) {
      content.push(i);
    }

    return (
      <ol className="DayInYearScale-items">
        {content.map((item, index) => {
          const className = classNames('DayInYearScale-item', {'is-selected': index === dayInYear});
          return (
            <li className={className} key={index} />
          );
        })}
      </ol>
    );
  }

  render(): React$Element<any> {
    const {deltaDate} = this.state;
    const {statTotal} = this.props;
    const date: Date = deltaDate || statTotal.date;
    const dateStr: string = dateToDayMonth(date);
    const currYear = date.getFullYear();
    const daysInYear = getDaysInYear(currYear);
    const dayInYear = getDayInYear(currYear, date.getMonth(), date.getDate());

    return (
      <Waypoint onEnter={this.onWaypointEnter} onLeave={this.onWaypointLeave}>
        <div className="DayInYearScale">
          <div className="DayInYearScale-title">{dateStr} в году:</div>
          {this.renderScale(daysInYear, dayInYear)}
        </div>
      </Waypoint>
    );
  }
}
