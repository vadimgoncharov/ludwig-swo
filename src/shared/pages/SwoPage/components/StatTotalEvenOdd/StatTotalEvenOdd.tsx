import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';

import * as format from 'shared/utils/format';
import {isEven} from 'shared/utils/math';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';

import {TStatTotalEvenOdd} from 'shared/types/StatTotalEvenOdd';
import {TStatTotal} from 'shared/types/StatTotal';

import './StatTotalEvenOdd.scss';

type TProps = {
  isFetching: boolean,
  statTotalEvenOdd: TStatTotalEvenOdd,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  oddValue: number,
  evenValue: number,
  time: number,
};

export default class StatTotalEvenOdd extends React.Component<TProps, TState> {
  public state: TState = {
    animatorCurrValue: {
      evenValue: 0,
      oddValue: 0,
      time: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.evenValue = props.statTotalEvenOdd.evenValue;
    this.state.animatorCurrValue.oddValue = props.statTotalEvenOdd.oddValue;
    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldEvenValue = this.props.statTotalEvenOdd.evenValue;
    const oldOddValue = this.props.statTotalEvenOdd.oddValue;
    const newEvenValue = nextProps.statTotalEvenOdd.evenValue;
    const newOddValue = nextProps.statTotalEvenOdd.oddValue;
    const oldTime = this.props.statTotal.date.getTime();
    const newTime = nextProps.statTotal.date.getTime();

    if (oldEvenValue === newEvenValue && oldOddValue === newOddValue && oldTime === newTime) {
      return;
    }

    this.animator.start([{oddValue: newOddValue, evenValue: newEvenValue, time: newTime}]);
  }

  public render() {
    const {oddValue, evenValue, time} = this.state.animatorCurrValue;
    const oddValueFormatted = this.getFormattedValue(oddValue);
    const evenValueFormatted = this.getFormattedValue(evenValue);

    const isTimeEven = isEven(new Date(time).getDate());
    const rootClassName = classNames('StatTotalEvenOdd', {
      'is-even': isTimeEven,
      'is-odd': !isTimeEven,
    });

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className={rootClassName}>
          <div className="StatTotalEvenOdd-mainTitle">
            <span className="StatTotalEvenOdd-mainTitleOdd">По нечетным</span> числам месяца сайт откроется{' '}
            <span className="StatTotalEvenOdd-mainTitleOdd">{oddValueFormatted}</span>,{' '}
            а <span className="StatTotalEvenOdd-mainTitleEven">по&nbsp;четным — {evenValueFormatted}</span>
          </div>
          <div className="StatTotalEvenOdd-sides">
            <div className="StatTotalEvenOdd-side is-reshka">
              <div className="StatTotalEvenOdd-sideImgContainer">
                <div className="StatTotalEvenOdd-sideImg" style={this.getImgSizeStyle(oddValue)} />
              </div>
              {this.renderSideValue(oddValue)}
            </div>
            <div className="StatTotalEvenOdd-side is-orel">
              <div className="StatTotalEvenOdd-sideImgContainer">
                <div className="StatTotalEvenOdd-sideImg" style={this.getImgSizeStyle(evenValue)} />
              </div>
              {this.renderSideValue(evenValue)}
            </div>
          </div>
        </div>
      </Waypoint>
    );
  }

  private getImgSizeStyle(value: number): object {
    const px = this.getPx(value, 1);
    return {
      width: `${px}px`,
      height: `${px}px`,
    };
  }

  private getPx(value: number, multiplier: number = 2): number {
    const {oddValue, evenValue} = this.state.animatorCurrValue;
    const max = Math.max(oddValue, evenValue);
    // TODO rename «dim» to more understandable name
    const dim = 200;
    const px = Math.round((dim * multiplier * Math.sqrt(value / max)));
    return px;
  }

  private renderSideValue(value: number) {
    const formatted = format.formatThousands(Math.round(value));
    const px = this.getPx(value);

    return (
      <div className="StatTotalEvenOdd-sideValue">
        &theta; &times; &radic;
        <span className="StatTotalEvenOdd-radixValue">&nbsp;{formatted}/&pi;&nbsp;</span>{' '}
        &asymp; {px} пикс.
      </div>
    );
  }

  private getFormattedValue(value: number): string {
    const roundedValue = Math.round(value);
    return format.formatValueToTimesWithPluralize(roundedValue);
  }

  private createAnimator(): Animator<TAnimatorValue> {
    const {evenValue, oddValue, time} = this.state.animatorCurrValue;
    return new Animator<TAnimatorValue>({
      from: [{evenValue, oddValue, time}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (
          oldValues[0].evenValue !== newValues[0].evenValue ||
          oldValues[0].oddValue !== newValues[0].oddValue ||
          oldValues[0].time !== newValues[0].time
        );
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
