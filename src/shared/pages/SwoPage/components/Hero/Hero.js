// @flow
import React, {Component} from 'react';
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
  deltaDate: ?Date,
|};

export default class Hero extends Component<void, Props, State> {
  props: Props;
  state: State;
  state = {
    isAnimationInProgress: false,
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
    tween.to({time: newDate.getTime()}, 3000);
    tween.onUpdate(() => {
      this.setState({
        deltaDate: new Date(data.time),
      });
    });
    tween.easing(TWEEN.Easing.Exponential.Out);
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

  render(): React$Element<any> {
    const {deltaDate} = this.state;
    const {statTotal} = this.props;
    const date: string = dateToDayMonth(deltaDate || statTotal.date);

    return (
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
    );
  }
}
