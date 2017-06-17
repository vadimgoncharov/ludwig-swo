import * as React from 'react';
import * as Waypoint from 'react-waypoint';

import * as format from 'shared/utils/format';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';

import {TStatTotalEvenOdd} from 'shared/types/StatTotalEvenOdd';

import './StatTotalEvenOdd.scss';
import {ReactElement} from 'react';

type TProps = {
  isFetching: boolean,
  statTotalEvenOdd: TStatTotalEvenOdd,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  oddValue: number,
  evenValue: number,
};

export default class StatTotalEvenOdd extends React.Component<TProps, TState> {
  public state: TState = {
    animatorCurrValue: {
      evenValue: 0,
      oddValue: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.evenValue = props.statTotalEvenOdd.evenValue;
    this.state.animatorCurrValue.oddValue = props.statTotalEvenOdd.oddValue;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldEvenValue = this.props.statTotalEvenOdd.evenValue;
    const oldOddValue = this.props.statTotalEvenOdd.oddValue;
    const newEvenValue = nextProps.statTotalEvenOdd.evenValue;
    const newOddValue = nextProps.statTotalEvenOdd.oddValue;

    if (oldEvenValue === newEvenValue && oldOddValue === newOddValue) {
      return;
    }

    this.animator.start([{oddValue: newOddValue, evenValue: newEvenValue}]);
  }

  public render() {
    const {oddValue, evenValue} = this.state.animatorCurrValue;
    const oddValueFormatted = this.getFormattedValue(oddValue);
    const evenValueFormatted = this.getFormattedValue(evenValue);

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatTotalEvenOdd">
          <div className="StatTotalEvenOdd-mainTitle">
            По нечетным числам месяца сайт откроется {oddValueFormatted}, а по четным — {evenValueFormatted}
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

  private renderSideValue(value: number): ReactElement<any> {
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
    const {evenValue, oddValue} = this.state.animatorCurrValue;
    return new Animator<TAnimatorValue>({
      from: [{evenValue, oddValue}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (
          oldValues[0].evenValue !== newValues[0].evenValue ||
          oldValues[0].oddValue !== newValues[0].oddValue
        );
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
