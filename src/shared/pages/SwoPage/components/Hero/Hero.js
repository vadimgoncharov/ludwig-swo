// @flow
import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import TWEEN from 'tween.js';

import Link from 'shared/components/Link';
import {dateToDayMonth} from 'shared/utils/date';
import type {StatTotal} from 'shared/reducers/stats';

import './Hero.scss';

type Props = {|
  isFetching: boolean,
  statTotal: StatTotal,
|};

type State = {|
  isAnimationInProgress: boolean,
  isInViewport: boolean,
  deltaDate: ?Date,
|};

export default class Hero extends Component<void, Props, State> {
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

  render(): React$Element<any> {
    const {deltaDate} = this.state;
    const {statTotal} = this.props;
    const date: string = dateToDayMonth(deltaDate || statTotal.date);

    return (
      <Waypoint onEnter={this.onWaypointEnter} onLeave={this.onWaypointLeave}>
        <div className="Hero">
          <div className="Hero-swo">
            Сайт откроется <span className="Hero-swoDate">{date}</span>
          </div>
          <div className="Hero-nav">
            <span className="Hero-navItem is-refresh">
              <Link href="/">Другой вариант</Link>
            </span> или <span className="Hero-navItem is-stat">
              <Link href="/#stat">минутка статистика</Link>
            </span>
          </div>
        </div>
      </Waypoint>
    );
  }
}
