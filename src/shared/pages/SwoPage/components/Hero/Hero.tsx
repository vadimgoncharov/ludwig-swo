import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as TWEEN from 'tween.js';

import Link from 'shared/components/Link';
import {dateToDayMonth} from 'shared/utils/date';

import {TStatTotal} from 'shared/types/StatTotal';

import './Hero.scss';

type Props = {
  isFetching: boolean,
  statTotal: TStatTotal,
};

type State = {
  isAnimationInProgress?: boolean,
  isInViewport?: boolean,
  deltaDate?: Date,
};

export default class Hero extends React.Component<Props, State> {
  public state = {
    isAnimationInProgress: false,
    isInViewport: false,
    deltaDate: null,
  };

  public componentWillReceiveProps(nextProps: Props) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.startAnimation(oldDate, newDate);
  }

  public startAnimation(oldDate: Date, newDate: Date) {
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

  public onWaypointEnter = () => {
    this.setState({
      isInViewport: true,
    });
  }

  public onWaypointLeave = () => {
    this.setState({
      isInViewport: false,
    });
  }

  public render() {
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
