import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT, DAYS_IN_YEAR} from 'shared/constants';
import {convertRange} from 'shared/utils/math';
import {dayNumToData, dayNumToDDMM} from 'shared/utils/date';
import {addLeadingZero, formatValueToTimesWithPluralize} from 'shared/utils/format';
import navSectionData from './navSectionData';
import './NumFreqInYear.scss';

import {TTotal} from 'shared/types/Total';
type TProps = {
  isFetching: boolean,
  total: TTotal,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
};

// 1=340..9=66
const NUM_FREQ_IN_YEAR_VALUES: number[] = [340, 316, 216, 85, 66, 67, 66, 67, 67, 66];
const NUM_FREQ_IN_YEAR_MIN_VALUE = Math.min.apply(Math, NUM_FREQ_IN_YEAR_VALUES);
const NUM_FREQ_IN_YEAR_MAX_VALUE = Math.max.apply(Math, NUM_FREQ_IN_YEAR_VALUES);
const NUM_FREQ_IN_YEAR_VALUE_WIDTH_MIN = 5;
const NUM_FREQ_IN_YEAR_VALUE_WIDTH_MAX = 100;
const NUM_FREQ_IN_YEAR_VALUES_WIDTHES = NUM_FREQ_IN_YEAR_VALUES.map((value) => {
  return convertRange(
    value,
    NUM_FREQ_IN_YEAR_MIN_VALUE,
    NUM_FREQ_IN_YEAR_MAX_VALUE,
    NUM_FREQ_IN_YEAR_VALUE_WIDTH_MIN,
    NUM_FREQ_IN_YEAR_VALUE_WIDTH_MAX,
  );
});

export default class NumFreqInYear extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      dayNum: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldDayNum === newDayNum) {
      return;
    }

    this.animator.start([{dayNum: newDayNum}]);
  }

  public render() {
    return (
      <section className="NumFreqInYear">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          {this.renderFreq()}
          {this.renderCalendar()}
        </SectionContent>
      </section>
    );
  }

  private renderFreq() {
    return (
      <div className="NumFreqInYear-freq">
        <div className="NumFreqInYear-freqTitle">Частокол</div>
        <div className="NumFreqInYear-freqSubTitle">
          Частота появления цифр от&nbsp;нуля до&nbsp;девяти в&nbsp;датах одного года:
        </div>
        <div className="NumFreqInYear-freqColumns">
          {this.renderFreqColumns()}
        </div>
      </div>
    );
  }

  private renderFreqColumns = () => {
    const {day: currDay} = dayNumToData(Math.round(this.state.animatorCurrValue.dayNum));
    const animatorCurrDayValueNums = this.getNumbersFromNumber(addLeadingZero(currDay));

    return NUM_FREQ_IN_YEAR_VALUES.map((valueAtNum: number, num: number) => {
      const valueAtNumFormatted: string = formatValueToTimesWithPluralize(valueAtNum);
      const horizontalLineWidth = NUM_FREQ_IN_YEAR_VALUES_WIDTHES[num];
      const numsFromNum = this.getNumbersFromNumber(num);
      const isSelected: boolean = numsFromNum.some((n) => animatorCurrDayValueNums.indexOf(n) !== -1);
      const className = classNames(
        'NumFreqInYear-freqColumn',
        {'is-selected': isSelected},
      );
      return (
        <div className={className} key={num}>
          <div className="NumFreqInYear-freqColumnLine is-vertical" style={{height: `${valueAtNum}px`}} />
          <div
            className="NumFreqInYear-freqColumnLine is-horizontal"
            style={{width: `${horizontalLineWidth}%`, flexBasis: `${horizontalLineWidth}%`}}
          />
          <div className="NumFreqInYear-freqColumnData">
            <div className="NumFreqInYear-freqColumnDataNum">«{num}»</div>
            <div className="NumFreqInYear-freqColumnDataValueAtNum">{valueAtNumFormatted}</div>
          </div>
        </div>
      );
    });
  };

  private renderCalendar() {
    const animatorCurrDateFormatted: string = dayNumToDDMM(Math.round(this.state.animatorCurrValue.dayNum));
    return (
      <div className="NumFreqInYear-calendar">
        <div className="NumFreqInYear-calendarItems">
          {Array.apply(null, Array(DAYS_IN_YEAR)).map((_, dayNum) => {
            const {month} = dayNumToData(dayNum);
            const isOddMonth: boolean = (month % 2) === 0;
            const dateFormatted = dayNumToDDMM(dayNum);
            const className = classNames(
              'NumFreqInYear-calendarItem',
              `is-${isOddMonth ? 'odd' : 'even'}Month`,
              {'is-selected': animatorCurrDateFormatted === dateFormatted},
            );
            return (
              <span className={className} key={dayNum}>{dateFormatted}</span>
            );
          })}
        </div>
      </div>
    );
  }

  private getNumbersFromNumber(num: number|string): number[] {
    return num.toString().split('').map((n) => parseInt(n));
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{dayNum: this.state.animatorCurrValue.dayNum}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => oldValues[0].dayNum !== newValues[0].dayNum,
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
