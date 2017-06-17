import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dateToMonthStr, dateToYYYYMMDD} from 'shared/utils/date';

import {TStatPrevDates} from 'shared/types/StatPrevDates';

import './StatPrevDates.scss';

type TProps = {
  isFetching: boolean,
  statPrevDates: TStatPrevDates,
};

type TState = {
  animatorCurrValues: TAnimatorValue[],
};

type TAnimatorValue = {
  time: number,
};

export default class StatPrevDates extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValues: [],
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValues = props.statPrevDates.map((item: Date): TAnimatorValue => {
      return {
        time: item.getTime(),
      };
    });

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDates = this.props.statPrevDates;
    const newDates = nextProps.statPrevDates;

    if (oldDates === newDates) {
      return;
    }

    this.animator.start(newDates.map((item: Date): TAnimatorValue => {
      return {
        time: item.getTime(),
      };
    }));
  }

  public render() {
    const stat = this.state.animatorCurrValues.map((item: TAnimatorValue) => {
      return new Date(item.time);
    });
    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatPrevDates">
          <div className="StatPrevDates-title">Предыдущие дни открытия сайта:</div>
          <ul className="StatPrevDates-items">
            {stat.map(this.renderItem)}
          </ul>
        </div>
      </Waypoint>
    );
  }

  private renderItem = (date: Date, index: number) => {
    const bgColorNum = date.getMonth() + 1;
    const itemValueClassName = classNames('StatPrevDates-itemValue', `is-bgColor${bgColorNum}`);
    return (
      <li className="StatPrevDates-item" key={index}>
        <div className={itemValueClassName}>{date.getDate()}</div>
        <div className="StatPrevDates-itemTitle">{dateToMonthStr(date)}</div>
      </li>
    );
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: this.state.animatorCurrValues,
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return oldValues.some((oldItem, index) => {
          const oldDate = dateToYYYYMMDD(new Date(oldItem.time));
          const newDate = dateToYYYYMMDD(new Date(newValues[index].time));

          return oldDate !== newDate;
        });
      },
      onValueChange: (newValue) => this.setState({animatorCurrValues: newValue}),
    });
  }
}
