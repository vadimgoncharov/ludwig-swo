import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as TWEEN from 'tween.js';

import {dateToMonthStr} from 'shared/utils/date';

import {TStatPrevDates} from 'shared/types/StatPrevDates';

import './StatPrevDates.scss';

type Props = {
  isFetching: boolean,
  statPrevDates: TStatPrevDates,
};

type State = {
  isAnimationInProgress?: boolean,
  isInViewport?: boolean,
  deltaDates?: TStatPrevDates,
};

const backgroundColors = [
  'limegreen',
  'goldenrod',
  'orchid',
  '#808000',
  'blanchedalmond',
  'powderblue',
];

const initalDate: Date = new Date();

export default class StatPrevDates extends React.Component<Props, State> {
  public state = {
    isAnimationInProgress: false,
    isInViewport: false,
    deltaDates: [
      initalDate,
      initalDate,
      initalDate,
      initalDate,
      initalDate,
      initalDate,
      initalDate,
      initalDate,
      initalDate,
      initalDate,
    ],
  };

  componentWillReceiveProps(nextProps: Props) {
    const oldDates = this.props.statPrevDates;
    const newDates = nextProps.statPrevDates;

    if (oldDates === newDates) {
      return;
    }

    this.startAnimation(oldDates, newDates);
  }

  startAnimation(oldDates: TStatPrevDates, newDates: TStatPrevDates) {
    this.setState({
      isAnimationInProgress: true,
    }, () => {
      oldDates.forEach((oldDate: Date, index: number) => {
        const newDate = newDates[index];
        const data = {time: oldDate.getTime()};
        const tween = new TWEEN.Tween(data);
        tween.to({time: newDate.getTime()}, this.state.isInViewport ? 3000 : 0);
        tween.onUpdate(() => {
          this.state.deltaDates[index] = new Date(data.time);
          if (index === oldDates.length - 1) {
            this.forceUpdate();
          }
        });
        tween.easing(TWEEN.Easing.Exponential.Out);
        tween.onComplete(() => {
          this.setState({
            isAnimationInProgress: false,
          });
        });
        tween.start();
      });
      const animate = () => {
        if (!this.state.isAnimationInProgress) {
          return;
        }
        requestAnimationFrame(animate);
        TWEEN.update();
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

  renderItem = (date: Date, index: number) => {
    const backgroundColor = backgroundColors[date.getMonth() % 6];
    const color = '#000';
    return (
      <li className="StatPrevDates-item" key={index}>
        <div className="StatPrevDates-itemValue" style={{backgroundColor, color}}>{date.getDate()}</div>
        <div className="StatPrevDates-itemTitle">{dateToMonthStr(date)}</div>
      </li>
    );
  };

  render() {
    const {statPrevDates} = this.props;
    const {deltaDates} = this.state;
    const stat = deltaDates[0] !== initalDate ? deltaDates : statPrevDates;
    return (
      <Waypoint onEnter={this.onWaypointEnter} onLeave={this.onWaypointLeave}>
        <div className="StatPrevDates">
          <div className="StatPrevDates-title">Предыдущие дни открытия сайта:</div>
          <ul className="StatPrevDates-items">
            {stat.map(this.renderItem)}
          </ul>
        </div>
      </Waypoint>
    );
  }
}
