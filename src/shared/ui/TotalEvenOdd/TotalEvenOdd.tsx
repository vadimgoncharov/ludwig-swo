import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dayNumToData} from 'shared/utils/date';
import {isEven} from 'shared/utils/math';
import {formatThousands, formatValueToTimesWithPluralize} from 'shared/utils/format';
import navSectionData from './navSectionData';
import './TotalEvenOdd.scss';

import {TTotalEvenOdd} from 'shared/types/TotalEvenOdd';
import {TTotal} from 'shared/types/Total';

type TProps = {
  isFetching: boolean,
  totalEvenOdd: TTotalEvenOdd,
  total: TTotal,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  oddValue: number,
  evenValue: number,
  dayNum: number,
};

export default class TotalEvenOdd extends React.Component<TProps, TState> {
  public state: TState = {
    animatorCurrValue: {
      evenValue: 0,
      oddValue: 0,
      dayNum: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.evenValue = props.totalEvenOdd.evenValue;
    this.state.animatorCurrValue.oddValue = props.totalEvenOdd.oddValue;
    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldEvenValue = this.props.totalEvenOdd.evenValue;
    const oldOddValue = this.props.totalEvenOdd.oddValue;
    const newEvenValue = nextProps.totalEvenOdd.evenValue;
    const newOddValue = nextProps.totalEvenOdd.oddValue;
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldEvenValue === newEvenValue && oldOddValue === newOddValue && oldDayNum === newDayNum) {
      return;
    }

    this.animator.start([{oddValue: newOddValue, evenValue: newEvenValue, dayNum: newDayNum}]);
  }

  public render() {
    const {oddValue, evenValue, dayNum} = this.state.animatorCurrValue;
    const oddValueFormatted = this.getFormattedValue(oddValue);
    const evenValueFormatted = this.getFormattedValue(evenValue);
    const {day: currDay} = dayNumToData(Math.round(dayNum));

    const isTimeEven = isEven(currDay);
    const rootClassName = classNames('TotalEvenOdd', {
      'is-even': isTimeEven,
      'is-odd': !isTimeEven,
    });

    return (
      <section className={rootClassName}>
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="TotalEvenOdd-title">{navSectionData.title}</div>
          <div className="TotalEvenOdd-description">
            <span className="TotalEvenOdd-descriptionOdd">По нечетным</span> числам месяца сайт откроется{' '}
            <span className="TotalEvenOdd-descriptionOdd">{oddValueFormatted}</span>,{' '}
            а <span className="TotalEvenOdd-descriptionEven">по&nbsp;четным — {evenValueFormatted}</span>
          </div>
          <div className="TotalEvenOdd-sides">
            <div className="TotalEvenOdd-side is-reshka">
              <div className="TotalEvenOdd-sideImgContainer">
                <div className="TotalEvenOdd-sideImg" style={this.getImgSizeStyle(oddValue)} />
              </div>
              {this.renderSideValue(oddValue)}
            </div>
            <div className="TotalEvenOdd-side is-orel">
              <div className="TotalEvenOdd-sideImgContainer">
                <div className="TotalEvenOdd-sideImg" style={this.getImgSizeStyle(evenValue)} />
              </div>
              {this.renderSideValue(evenValue)}
            </div>
          </div>
        </SectionContent>
      </section>
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
    const formatted = formatThousands(Math.round(value));
    const px = this.getPx(value);

    return (
      <div className="TotalEvenOdd-sideValue">
        &theta; &times; &radic;
        <span className="TotalEvenOdd-radixValue">&nbsp;{formatted}/&pi;&nbsp;</span>{' '}
        &asymp; {px} пикс.
      </div>
    );
  }

  private getFormattedValue(value: number): string {
    const roundedValue = Math.round(value);
    return formatValueToTimesWithPluralize(roundedValue);
  }

  private createAnimator(): Animator<TAnimatorValue> {
    const {evenValue, oddValue, dayNum} = this.state.animatorCurrValue;
    return new Animator<TAnimatorValue>({
      from: [{evenValue, oddValue, dayNum}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (
          oldValues[0].evenValue !== newValues[0].evenValue ||
          oldValues[0].oddValue !== newValues[0].oddValue ||
          oldValues[0].dayNum !== newValues[0].dayNum
        );
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
