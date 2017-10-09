import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import navSectionData from './navSectionData';
import {dayMonthToDayNum, dayNumToColor, dayNumToData} from 'shared/utils/date';
import './DayInMonthHistogram.scss';

import {TDayInMonth} from 'shared/types/DayInMonth';
import {TTotal} from 'shared/types/Total';
type TProps = {
  dayInMonth: TDayInMonth,
  total: TTotal,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
};

const COLUMN_MAX_HEIGHT = 200;

export default class DayInMonthHistogram extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
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
    const {dayInMonth} = this.props;
    const currDayNum = Math.round(this.state.animatorCurrValue.dayNum);
    const {day: currDay, month: currMonth} = dayNumToData(currDayNum);
    const maxValue = this.getMaxValue();

    return (
      <section className="DayInMonthHistogram">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="DayInMonthHistogram-title">{navSectionData.title}</div>
          <div className="DayInMonthHistogram-subTitle">
            Распределение открытия сайта по&nbsp;порядковым номерам дней в&nbsp;месяце:
          </div>
          <div className="DayInMonthHistogram-items">
            {dayInMonth.map((item, index) => {
              const {dayNumAtMonth, value} = item;
              const dayNum = dayMonthToDayNum(dayNumAtMonth, currMonth);
              const isValidDayNum = typeof dayNum !== 'undefined';
              const className = classNames(
                'DayInMonthHistogram-item',
                {'is-selected': dayNum === currDayNum},
              );

              let day;
              let color;
              if (isValidDayNum) {
                day = dayNumToData(dayNum);
                color = dayNumToColor(dayNum).bgColor;
              }

              const columnSize = COLUMN_MAX_HEIGHT * value / maxValue;
              const styleItem = {
                color: day === currDay ? color : null,
              };
              const styleVertical: {height: string, background?: string} = {
                height: `${columnSize}px`,
                background: color ? color : null,
              };
              const styleHorizontal: {width: string, background?: string} = {
                width: `${columnSize}px`,
                background: color ? color : null,
              };

              return (
                <div className={className} key={dayNumAtMonth} style={styleItem}>
                  <div className="DayInMonthHistogram-itemDayNum">{dayNumAtMonth}</div>
                  <div className="DayInMonthHistogram-itemColumn is-vertical" style={styleVertical} />
                  <div className="DayInMonthHistogram-itemColumn is-horizontal" style={styleHorizontal} />
                </div>
              );
            })}
          </div>
        </SectionContent>
      </section>
    );
  }

  private getMaxValue(): number {
     return this.props.dayInMonth.reduce((sum: number, item) => {
       return Math.max(sum, item.value);
     }, 0);
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
