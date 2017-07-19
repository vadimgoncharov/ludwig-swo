import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dateToYYYYMMDD} from 'shared/utils/date';

import {TStatDayInMonth} from 'shared/types/StatDayInMonth';
import {TStatTotal} from 'shared/types/StatTotal';

import './StatDayInMonth.scss';

type TProps = {
  isFetching: boolean,
  statDayInMonth: TStatDayInMonth,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

const COLUMN_MAX_HEIGHT = 200;

export default class StatDayInMonth extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
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
    const {statDayInMonth} = this.props;
    const animatorCurrDayNum = new Date(this.state.animatorCurrValue.time).getDate();
    const maxValue = this.getMaxValue();

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatDayInMonth">
          <div className="StatDayInMonth-title">
            Гистограмма
          </div>
          <div className="StatDayInMonth-subTitle">
            Распределение открытия сайта по порядковым номерам дней в месяце:
          </div>
          <div className="StatDayInMonth-items">
            {statDayInMonth.map((item, index) => {
              const {dayNum, value} = item;
              const columnSize = COLUMN_MAX_HEIGHT * value / maxValue;
              const className = classNames(
                'StatDayInMonth-item',
                {'is-selected': dayNum === animatorCurrDayNum},
              );
              const itemColumnClassNameVertical = classNames(
                'StatDayInMonth-itemColumn is-vertical',
                `is-bgColor${dayNum}`,
              );
              const itemColumnClassNameHorizontal = classNames(
                'StatDayInMonth-itemColumn is-horizontal',
                `is-bgColor${dayNum}`,
              );
              return (
                <div className={className} key={index}>
                  <div className="StatDayInMonth-itemDayNum">{dayNum}</div>
                  <div className={itemColumnClassNameVertical} style={{height: `${columnSize}px`}} />
                  <div className={itemColumnClassNameHorizontal} style={{width: `${columnSize}px`}} />
                </div>
              );
            })}
          </div>
        </div>
      </Waypoint>
    );
  }

  private getMaxValue(): number {
     return this.props.statDayInMonth.reduce((sum: number, item) => {
       return Math.max(sum, item.value);
     }, 0);
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
