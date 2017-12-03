import * as React from 'react';
import * as classNames from 'classnames';
import * as pluralize from 'plural-ru';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import {formatThousands} from 'shared/utils/format';
import navSectionData from './navSectionData';
import './Square.scss';

import {TMinMax} from 'shared/types/MinMax';
import {TLastGeneratedDate} from 'shared/types/LastGeneratedDate';
type TProps = {
  lastGeneratedDate: TLastGeneratedDate,
  minMax: TMinMax,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
  value: number,
};

const GIF_PIXEL_MULTIPLIER = 3;

export default class Square extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      dayNum: 0,
      value: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.lastGeneratedDate.dayNum;
    this.state.animatorCurrValue.value = props.lastGeneratedDate.value;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldValue = this.props.lastGeneratedDate.value;
    const newValue = nextProps.lastGeneratedDate.value;
    const oldDayNum = this.props.lastGeneratedDate.dayNum;
    const newDayNum = nextProps.lastGeneratedDate.dayNum;
    if (oldValue === newValue && oldDayNum === newDayNum) {
      return;
    }

    this.animator.start([{value: newValue, dayNum: newDayNum}]);
  }

  public render() {
    const value: number = Math.round(this.state.animatorCurrValue.value);
    const maxValueSquareRootRounded = this.getSquareRootRounded(this.getMaxValue());
    const valueSquareRootRounded = this.getSquareRootRounded(value);
    const valueSquareRounded = this.getSquareRounded(value);
    const date = dayNumToDayMonthAccusative(Math.round(this.state.animatorCurrValue.dayNum));
    const squareContainerStyle = {
      width: `${maxValueSquareRootRounded * GIF_PIXEL_MULTIPLIER}px`,
      height: `${maxValueSquareRootRounded * GIF_PIXEL_MULTIPLIER}px`,
    };
    const squareStyle = {
      width: `${valueSquareRootRounded * GIF_PIXEL_MULTIPLIER}px`,
      height: `${valueSquareRootRounded * GIF_PIXEL_MULTIPLIER}px`,
    };

    const valueRest = value - valueSquareRounded;

    const valueFormatted = formatThousands(value);
    const valueSquareRootRoundedFormatted = formatThousands(valueSquareRootRounded);
    const valueSquareRoundedFormatted = formatThousands(valueSquareRounded);

    return (
      <section className="Square">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="Square-title">{navSectionData.title}</div>
          <div className="Square-subTitle">
            Квадрат, площадь которого примерно равна{' '}
            <span className="Square-value">{valueFormatted} пкс<sup>2</sup></span>{' '}
            (числу открытий сайта <span className="Square-date">{date}</span>):
          </div>
          <div className="Square-squareContainer" style={squareContainerStyle}>
            <div className="Square-square" style={squareStyle} />
          </div>
          <div className="Square-calc">
            <span className="Square-value">{valueSquareRootRoundedFormatted}</span>{' '}
            ×{' '}
            <span className="Square-value">{valueSquareRootRoundedFormatted}</span>{' '}
            ={' '}
            <span className="Square-value">{valueSquareRoundedFormatted} пкс<sup>2</sup></span>
          </div>
          {this.renderRest(valueRest)}
        </SectionContent>
      </section>
    );
  }

  private renderRest(value: number) {
    const style = {
      width: `${value * GIF_PIXEL_MULTIPLIER}px`,
      height: `${GIF_PIXEL_MULTIPLIER}px`,
    };

    const restStr = pluralize(value, 'Остался', 'Осталось', 'Осталось');
    const valueFinal = Math.max(value, 0);

    const className = classNames('Square-rest', {'is-visible': value > 0});
    return (
      <div className={className}>
        <div className="Square-restTitle">
          {restStr} {formatThousands(valueFinal)} пкс<sup>2</sup>:
        </div>
        <div className="Square-restSquares" style={style} />
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

  private getMaxValue(): number {
    return this.props.minMax[0].value;
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{value: this.state.animatorCurrValue.value, dayNum: this.state.animatorCurrValue.dayNum}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        const isChanged = (
          (Math.round(oldValues[0].value) !== Math.round(newValues[0].value)) ||
          (Math.round(oldValues[0].dayNum) !== Math.round(newValues[0].dayNum))
        );
        return Boolean(isChanged);
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
