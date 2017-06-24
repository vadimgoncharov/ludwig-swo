import * as React from 'react';
import * as Waypoint from 'react-waypoint';

import * as format from 'shared/utils/format';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import Link from 'shared/components/Link';

import {TStatTotal} from 'shared/types/StatTotal';

import './StatTotal.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  value: number,
};

export default class StatTotal extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      value: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.value = props.statTotal.value;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldValue = this.props.statTotal.value;
    const newValue = nextProps.statTotal.value;

    if (oldValue === newValue) {
      return;
    }

    this.animator.start([{value: newValue}]);
  }

  public render() {
    const totalValue: number = Math.round(this.state.animatorCurrValue.value);

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatTotal">
          <a name="stat" />
          <div className="StatTotal-title">Минутка статистика</div>
          <div className="StatTotal-subTitle">Всего сайт откроется</div>
          <div className="StatTotal-totalValue">{this.renderTotalValueFormatted(totalValue)}</div>
          <div className="StatTotal-refreshLinkContainer">
            <Link className="StatTotal-refreshLink" href="/#stat">И еще раз</Link>
          </div>
          <div className="StatTotal-description">
            Каждый раз сайт сообщает новую случайную дату открытия.<br />
            Все обещания бережно записываются, и на их основе строится статистика.</div>
          <div className="StatTotal-sumOfNum">Кстати, {this.renderSumOfNumber(totalValue)}.</div>
        </div>
      </Waypoint>
    );
  }

  private renderTotalValueFormatted(value: number): string {
    if (this.animator.isAnimationInProgress()) {
      return format.formatValueToTimesWithoutPluralize(value);
    }
    return format.formatValueToTimesWithPluralize(value);
  }

  private renderSumOfNumber(value: number): string {
    const numArr: number[] = value
      .toString()
      .split('')
      .map((val: string) => parseInt(val));

    const sum: number = numArr.reduce((numSum: number, numValue: number) => {
      numSum += numValue;
      return numSum;
    }, 0);

    const numSumStr: string = numArr.join(' + ');

    return `${numSumStr} = ${sum}`;
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{value: this.state.animatorCurrValue.value}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return Math.round(oldValues[0].value) !== Math.round(newValues[0].value);
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
