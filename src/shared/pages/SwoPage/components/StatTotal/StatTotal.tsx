import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as TWEEN from 'tween.js';
import * as formatThousands from 'format-thousands';
import * as pluralize from 'plural-ru';

import Link from 'shared/components/Link';

import {TStatTotal} from 'shared/types/StatTotal';

import './StatTotal.scss';

type Props = {
  isFetching: boolean,
  statTotal: TStatTotal,
};

type State = {
  isAnimationInProgress?: boolean,
  isInViewport?: boolean,
  deltaValue?: number | null,
};

export default class StatTotal extends React.Component<Props, State> {
  public state = {
    isAnimationInProgress: false,
    isInViewport: false,
    deltaValue: null,
  };

  public componentWillReceiveProps(nextProps: Props) {
    const oldValue = this.props.statTotal.value;
    const newValue = nextProps.statTotal.value;

    if (oldValue === newValue) {
      return;
    }

    this.startAnimation(oldValue, newValue);
  }

  public startAnimation(oldValue: number, newValue: number) {
    this.setState({
      isAnimationInProgress: true,
    }, () => {
      const data = {value: oldValue};
      const tween = new TWEEN.Tween(data);
      tween.to({value: newValue}, this.state.isInViewport ? 1000 : 0);
      tween.onUpdate(() => {
        this.state.deltaValue = Math.round(data.value);
      });
      tween.easing(TWEEN.Easing.Exponential.Out);
      tween.onComplete(() => {
        this.setState({
          isAnimationInProgress: false,
        });
      });
      tween.start();
      const animate = () => {
        if (!this.state.isAnimationInProgress) {
          return;
        }
        requestAnimationFrame(animate);
        TWEEN.update();
        this.forceUpdate();
      };
      animate();
    });
  }

  private onWaypointEnter = () => {
    this.setState({
      isInViewport: true,
    });
  };

  private onWaypointLeave = () => {
    this.setState({
      isInViewport: false,
    });
  };

  public renderTotalValueFormatted(value: number): string {
    const formatted: string = formatThousands(value);
    const postfix: string = pluralize(value, 'раз', 'раза', 'раз');

    if (this.state.isAnimationInProgress) {
      return `${formatted} раза`;
    }
    return `${formatted} ${postfix}`;
  }

  public renderSumOfNumber(value: number): string {
    const numArr: number[] = value
      .toString()
      .split('')
      .map((val: string) => parseInt(val));

    const sum: number = numArr.reduce((sum: number, value: number) => {
      sum += value;
      return sum;
    }, 0);

    const numSumStr: string = numArr.join(' + ');

    return `${numSumStr} = ${sum}`;
  }

  public render() {
    const {deltaValue} = this.state;
    const {statTotal} = this.props;
    const totalValue: number = deltaValue || statTotal.value;

    return (
      <Waypoint onEnter={this.onWaypointEnter} onLeave={this.onWaypointLeave}>
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
}
