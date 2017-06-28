import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import * as pluralize from 'plural-ru';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dateToDayMonth} from 'shared/utils/date';
import {formatThousands} from 'shared/utils/format';

import {TStatLastGeneratedDate} from 'shared/types/StatLastGeneratedDate';

import './StatSquare.scss';

type TProps = {
  isFetching: boolean,
  statLastGeneratedDate: TStatLastGeneratedDate,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
  value: number,
};

const GIF_PIXEL_MULTIPLIER = 3;

export default class StatSquare extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      time: 0,
      value: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statLastGeneratedDate.date.getTime();
    this.state.animatorCurrValue.value = props.statLastGeneratedDate.value;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldValue = this.props.statLastGeneratedDate.value;
    const newValue = nextProps.statLastGeneratedDate.value;
    const oldTime = this.props.statLastGeneratedDate.date.getTime();
    const newTime = nextProps.statLastGeneratedDate.date.getTime();
    if (oldValue === newValue && oldTime === newTime) {
      return;
    }

    this.animator.start([{value: newValue, time: newTime}]);
  }

  public render() {
    const value: number = Math.round(this.state.animatorCurrValue.value);
    const valueSquareRootRounded = this.getSquareRootRounded(value);
    const valueSquareRounded = this.getSquareRounded(value);
    const date = dateToDayMonth(new Date(this.state.animatorCurrValue.time));
    const squareStyle = {
      width: `${valueSquareRootRounded * GIF_PIXEL_MULTIPLIER}px`,
      height: `${valueSquareRootRounded * GIF_PIXEL_MULTIPLIER}px`,
    };

    const valueRest = value - valueSquareRounded;

    const valueFormatted = formatThousands(value);
    const valueSquareRootRoundedFormatted = formatThousands(valueSquareRootRounded);
    const valueSquareRoundedFormatted = formatThousands(valueSquareRounded);

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatSquare">
          <div className="StatSquare-title">
            Квадрат, площадь которого примерно равна{' '}
            <span className="StatSquare-value">{valueFormatted} пкс<sup>2</sup></span>{' '}
            (числу открытий сайта <span className="StatSquare-date">{date}</span>):
          </div>
          <div className="StatSquare-square" style={squareStyle} />
          <div className="StatSquare-calc">
            <span className="StatSquare-value">{valueSquareRootRoundedFormatted}</span>{' '}
            ×{' '}
            <span className="StatSquare-value">{valueSquareRootRoundedFormatted}</span>{' '}
            ={' '}
            <span className="StatSquare-value">{valueSquareRoundedFormatted} пкс<sup>2</sup></span>
          </div>
          {this.renderRest(valueRest)}
        </div>
      </Waypoint>
    );
  }

  private renderRest(value: number) {
    const style = {
      width: `${value * GIF_PIXEL_MULTIPLIER}px`,
      height: `${GIF_PIXEL_MULTIPLIER}px`,
    };

    const restStr = pluralize(value, 'Остался', 'Осталось', 'Осталось');
    const valueFinal = Math.max(value, 0);

    const className = classNames('StatSquare-rest', {'is-visible': value > 0});
    return (
      <div className={className}>
        <div className="StatSquare-restTitle">
          {restStr} {formatThousands(valueFinal)} пкс<sup>2</sup>:
        </div>
        <div className="StatSquare-restSquares" style={style} />
      </div>
    );
  }

  private getSquareRootRounded(value: number): number {
    return Math.floor(Math.sqrt(value));
  }

  private getSquareRounded(value: number): number {
    const squareRoot = this.getSquareRootRounded(value);
    return squareRoot * squareRoot;
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{value: this.state.animatorCurrValue.value, time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        const isChanged = (
          (Math.round(oldValues[0].value) !== Math.round(newValues[0].value)) ||
          (Math.round(oldValues[0].time) !== Math.round(newValues[0].time))
        );
        return Boolean(isChanged);
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
