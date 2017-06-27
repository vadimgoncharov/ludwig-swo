import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as TWEEN from '@tweenjs/tween.js';

import Animator from 'shared/services/Animator';

import './StatHalfYear.scss';

import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {TStatHalfYear} from 'shared/types/StatHalfYear';

type TProps = {
  isFetching: boolean,
  statHalfYear: TStatHalfYear,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  first: number,
  second: number,
};

const FRACTION_NUMBER_COUNT = 12;

export default class StatHalfYear extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      first: 0,
      second: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.first = props.statHalfYear.first;
    this.state.animatorCurrValue.second = props.statHalfYear.second;

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldFirst = this.props.statHalfYear.first;
    const oldSecond = this.props.statHalfYear.second;
    const newFirst = nextProps.statHalfYear.first;
    const newSecond = nextProps.statHalfYear.second;

    if (oldFirst === newFirst && oldSecond === newSecond) {
      return;
    }

    this.animator.start([{first: newFirst, second: newSecond}]);
  }

  public render() {
    const {first, second} = this.state.animatorCurrValue;
    const total = first + second;
    const firstInPercent: string = (first * 100 / total).toFixed(FRACTION_NUMBER_COUNT);
    const secondInPercent: string = (second * 100 / total).toFixed(FRACTION_NUMBER_COUNT);

    const result: string = (parseFloat(firstInPercent) / parseFloat(secondInPercent)).toFixed(FRACTION_NUMBER_COUNT);

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatHalfYear">
          <div className="StatHalfYear-title">
            Отношение числа открытий сайта в&nbsp;первом полугодии к&nbsp;числу открытий во&nbsp;втором полугодии:
          </div>
          <div className="StatHalfYear-items">
            <span className="StatHalfYear-item is-first">{firstInPercent}%</span>{' '}
            <span className="StatHalfYear-item is-division">
              <span className="StatHalfYear-itemInner">÷</span>
            </span>{' '}
            <span className="StatHalfYear-item is-second">{secondInPercent}%</span>{' '}
            <span className="StatHalfYear-item is-equal">=</span>{' '}
            <span className="StatHalfYear-item is-result">{result}</span>
          </div>
        </div>
      </Waypoint>
    )
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{first: this.state.animatorCurrValue.first, second: this.state.animatorCurrValue.second}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (oldValues[0].first !== newValues[0].first || oldValues[0].second !== newValues[0].second)
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
      easing: TWEEN.Easing.Back.InOut,
    });
  }
}
