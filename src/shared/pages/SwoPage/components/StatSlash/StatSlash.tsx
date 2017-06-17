import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dateToYYYYMMDD, getDayNumberInYearByDate} from 'shared/utils/date';

import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TStatTotal} from 'shared/types/StatTotal';

import './StatSlash.scss';

type TProps = {
  isFetching: boolean,
  statDayInYear: TStatDayInYear,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class StatSlash extends React.Component<TProps, TState> {
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
    const {statDayInYear} = this.props;
    const animatorCurrDayNum = getDayNumberInYearByDate(new Date(this.state.animatorCurrValue.time));

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
       <div className="StatSlash">
         <div className="StatSlash-mainTitle">
           Изменение числа открытий сайта в&nbsp;каждый из&nbsp;дней{' '}
           по&nbsp;отношению к&nbsp;предыдущему, выраженное псевдографикой:
         </div>
         <div className="StatSlash-items">
           {statDayInYear.map((item, index) => {
             const currValue = item.value;
             const prevValue: number = typeof statDayInYear[index - 1] !== 'undefined'
              ? statDayInYear[index - 1].value
              : 0;
             let content;
             const isSelected = item.dayNum === animatorCurrDayNum;
             let className = classNames('StatSlash-item', {'is-selected': isSelected});
             if (currValue > prevValue) {
               content = '/';
               className = classNames(className, 'is-gt');
             } else if (currValue < prevValue) {
               content = '\\';
               className = classNames(className, 'is-lt');
             } else {
               content = '|';
               className = classNames(className, 'is-eq');
             }
             return (
               <div className={className} key={index}>
                 {content}
               </div>
             );
           })}
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
