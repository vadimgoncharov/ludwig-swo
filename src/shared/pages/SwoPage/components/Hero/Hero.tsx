import * as React from 'react';
import * as Waypoint from 'react-waypoint';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import Link from 'shared/components/Link';
import {dateToDayMonth, dateToYYYYMMDD} from 'shared/utils/date';

import {TStatTotal} from 'shared/types/StatTotal';

import './Hero.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class Hero extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      time: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.animator.start([{time: newDate.getTime()}]);
  }

  public render() {
    const date: string = dateToDayMonth(new Date(this.state.animatorCurrValue.time));

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
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

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (dateToYYYYMMDD(new Date(oldValues[0].time)) !== dateToYYYYMMDD(new Date(newValues[0].time)));
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
