import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import * as TWEEN from 'tween.js';

import {dateToDayMonth, getDaysInYear, getDayInYear} from 'shared/utils/date';
import {StatTotal} from 'shared/reducers/stats';

import './DayInYearScale.scss';

type Props = {
  isFetching: boolean,
  statTotal: StatTotal,
};

type State = {
  isAnimationInProgress?: boolean,
  isInViewport?: boolean,
  deltaDate?: Date,
};

export default class DayInYearScale extends React.Component<Props, State> {
  state = {
    isAnimationInProgress: false,
    isInViewport: false,
    deltaDate: null,
  };

  componentWillReceiveProps(nextProps: Props) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.startAnimation(oldDate, newDate);
  }

  startAnimation(oldDate: Date, newDate: Date) {
    this.setState({
      isAnimationInProgress: true,
    }, () => {
      const data = {time: oldDate.getTime()};
      const tween = new TWEEN.Tween(data);
      tween.to({time: newDate.getTime()}, this.state.isInViewport ? 3000 : 0);
      tween.onUpdate(() => {
        this.state.deltaDate = new Date(data.time);
      });
      tween.easing(TWEEN.Easing.Exponential.Out);
      tween.onComplete(() => {
        this.setState({
          isAnimationInProgress: false,
        });
      });
      tween.start();
      const animate = () => {
        if (!this.state.isAnimationInProgress) {
          return;
        }
        requestAnimationFrame(animate);
        TWEEN.update();
        this.forceUpdate();
      };
      animate();
    });
  }

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
    const diff: number = end.getTime() - start.getTime();
    const oneDay: number = 1000 * 60 * 60 * 24;
    const dayInYear: number = Math.floor(diff / oneDay);

    return dayInYear;
  }

  renderScale(daysInYear: number, dayInYear: number) {
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

  render() {
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
