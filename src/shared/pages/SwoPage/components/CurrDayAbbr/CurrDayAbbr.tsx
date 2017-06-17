import * as React from 'react';
import * as Waypoint from 'react-waypoint';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {
  dateToDayMonthAbbr,
  dateToDayMonth,
  dateToYYYYMMDD,
} from 'shared/utils/date';

import {TStatTotal} from 'shared/types/StatTotal';

import './CurrDayAbbr.scss';

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

export default class CurrDayAbbr extends React.Component<TProps, TState> {
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
    const animatorCurrDate = new Date(this.state.animatorCurrValue.time);
    const date: string = dateToDayMonth(animatorCurrDate);
    const abbr = dateToDayMonthAbbr(animatorCurrDate);
    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="CurrDayAbbr">
          <div className="CurrDayAbbr-mainTitle">
            Дата открытия сайта {date} в сокращенном виде:
          </div>
          <abbr className="CurrDayAbbr-abbr">«{abbr}»</abbr>
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
