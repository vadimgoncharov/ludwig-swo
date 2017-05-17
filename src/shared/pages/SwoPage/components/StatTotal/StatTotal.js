// @flow
import React, {Component} from 'react';
import TWEEN from 'tween.js';

import formatThousands from 'format-thousands';
import pluralize from 'plural-ru';

import Link from 'shared/components/Link';
import type {StatTotal as StatTotalType} from 'shared/reducers/stats';

import './StatTotal.scss';

type Props = {|
  isFetching: boolean,
  statTotal: StatTotalType,
|};

type State = {|
  isAnimationInProgress: boolean,
  deltaValue: ?number,
|};

export default class StatTotal extends Component<void, Props, State> {
  props: Props;
  state: State;
  state = {
    isAnimationInProgress: false,
    deltaValue: null
  };

  componentWillReceiveProps(nextProps: Props) {
    const oldValue = this.props.statTotal.value;
    const newValue = nextProps.statTotal.value;

    this.startAnimation(oldValue, newValue);
  }

  startAnimation(oldValue: number, newValue: number) {
    this.setState({
      isAnimationInProgress: true,
    });
    const data = {value: oldValue};
    const tween = new TWEEN.Tween(data);
    tween.to({value: newValue}, 1000);
    tween.onUpdate(() => {
      this.setState({
        deltaValue: parseInt(data.value),
      });
    });
    tween.easing(TWEEN.Easing.Exponential.Out);
    tween.onComplete(() => {
      this.setState({
        isAnimationInProgress: false,
      });
    });
    tween.start();
    this.animate();
  }

  animate = () => {
    if (!this.state.isAnimationInProgress) {
      return;
    }
    requestAnimationFrame(this.animate);
    TWEEN.update();
  };

  renderTotalValueFormatted(value: number): string {
    const formatted: string = formatThousands(value);
    const postfix: string = pluralize(value, 'раз', 'раза', 'раз');

    if (this.state.isAnimationInProgress) {
      return `${formatted} раза`;
    }
    return `${formatted} ${postfix}`;
  }

  renderSumOfNumber(value: number): string {
    const numArr: number[] = value
      .toString()
      .split('')
      .map((value: string) => parseInt(value));

    const sum: number = numArr.reduce((sum: number, value: number) => {
      sum += value;
      return sum;
    }, 0);

    const numSumStr: string = numArr.join(' + ');

    return `${numSumStr} = ${sum}`;
  }

  render(): React$Element<any> {
    const {deltaValue} = this.state;
    const {statTotal} = this.props;
    const totalValue: number = deltaValue || statTotal.value;

    return (
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
    );
  }
}
