import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import navSectionData from './navSectionData';
import './SumColumns.scss';

import {TTotal} from 'shared/types/Total';
import {TMonthsDay} from 'shared/types/MonthsDay';
import {TMonths} from 'shared/types/Months';
import {
  dayMonthToDayMonthAccusative,
  monthToMonthPrepositional,
  dayNumToMonthPrepositional,
  dayNumToData,
} from 'shared/utils/date';
import {formatDays, formatValueToTimesWithPluralize} from 'shared/utils/format';

type TProps = {
  total: TTotal,
  months: TMonths,
  monthsDay: TMonthsDay,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
  animatorCurrValues: TAnimatorValue[],
};
type TAnimatorValue = {
  dayNum: number,
  value?: number,
};

export default class StatTower extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      dayNum: 0,
    },
    animatorCurrValues: [],
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;

    // We can not iterate through props.monthsDay directly,
    // because it could have less then 12 month
    // for example if we have 31 february
    this.state.animatorCurrValues = Array.apply(null, Array(12)).map((_, monthIndex) => {
      const monthsDayItem = props.monthsDay[monthIndex];
      if (typeof monthsDayItem !== 'undefined') {
        return {
          dayNum: monthsDayItem.dayNum,
          value: monthsDayItem.value,
        };
      }
      return {
        dayNum: 0,
        value: 0,
      }
    });

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldDayNum === newDayNum) {
      return;
    }

    this.animator.start([{dayNum: newDayNum}].concat(nextProps.monthsDay.map((item) => {
      return {
        dayNum: item.dayNum,
        value: item.value,
      };
    })));
  }

  public render() {
    return (
      <section className="SumColumns">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="SumColumns-title">{navSectionData.title}</div>
          <div className="SumColumns-columns">
            {this.renderChanceColumn()}
            {this.renderMonthDayColumn()}
            {this.renderLeapYearColumn()}
          </div>
        </SectionContent>
      </section>
    );
  }

  private renderChanceColumn() {
    const {months} = this.props;
    const totalValue: number = this.props.total.value;
    const {month: currMonth} = dayNumToData(Math.round(this.state.animatorCurrValue.dayNum));

    return (
      <div className="SumColumns-column">
        <div className="SumColumns-columnTitle">Вероятность открытия сайта по&nbsp;месяцам:</div>
        <div className="SumColumns-columnItems">
          {months.map((item, index) => {
            const {dayNum} = item;
            const {month} = dayNumToData(dayNum);
            const chance = (item.value * 100 / totalValue).toFixed(2);
            const itemClassName = classNames('SumColumns-columnItem', {
              'is-selected': month === currMonth,
            });
            return (
              <div className={itemClassName} key={index}>
                <div className="SumColumns-columnItemTitle">в {dayNumToMonthPrepositional(dayNum)}</div>
                <div className="SumColumns-columnItemValue">{chance} %</div>
              </div>
            );
          })}
          <div className="SumColumns-columnItem is-total">
            <div className="SumColumns-columnItemTitle">Всего:</div>
            <div className="SumColumns-columnItemValue">100 %</div>
          </div>
        </div>
      </div>
    );
  }

  private renderMonthDayColumn() {
    const {monthsDay} = this.props;
    const {animatorCurrValue, animatorCurrValues} = this.state;
    const {day: currDay, month: currMonth} = dayNumToData(Math.round(animatorCurrValue.dayNum));
    const total = Math.round(monthsDay.reduce((sum, item, index) => {
      return sum + animatorCurrValues[index].value;
    }, 0));

    return (
      <div className="SumColumns-column">
        <div className="SumColumns-columnTitle">
          Количество открытий{' '}
          <span className="SumColumns-columnTitleDays">по {currDay} числам:</span>
        </div>
        <div className="SumColumns-columnItems">
          {monthsDay.map((item, index) => {
            const {month} = dayNumToData(item.dayNum);
            const date = dayMonthToDayMonthAccusative(currDay, month);
            const itemClassName = classNames('SumColumns-columnItem', {
              'is-selected': month === currMonth,
              'is-visible_no': item.value === 0,
            });
            return (
              <div className={itemClassName} key={index}>
                <div className="SumColumns-columnItemTitle">
                  {date}
                </div>
                <div className="SumColumns-columnItemValue">
                  {formatValueToTimesWithPluralize(Math.round(animatorCurrValues[index].value))}
                </div>
              </div>
            );
          })}
          <div className="SumColumns-columnItem is-total">
            <div className="SumColumns-columnItemTitle">Всего:</div>
            <div className="SumColumns-columnItemValue">{formatValueToTimesWithPluralize(total)}</div>
          </div>
        </div>
      </div>
    );
  }

  private renderLeapYearColumn() {
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const total = daysInMonth.reduce((sum, days) => {
      return sum + days;
    }, 0);
    const {month: currMonth} = dayNumToData(Math.round(this.state.animatorCurrValue.dayNum));

    return (
      <div className="SumColumns-column">
        <div className="SumColumns-columnTitle is-short">В&nbsp;високосном году:</div>
        <div className="SumColumns-columnItems">
          {daysInMonth.map((days, index) => {
            const itemClassName = classNames('SumColumns-columnItem', {
              'is-selected': index === currMonth,
            });
            const date = monthToMonthPrepositional(index);
            return (
              <div className={itemClassName} key={index}>
                <div className="SumColumns-columnItemTitle">в {date}</div>
                <div className="SumColumns-columnItemValue">{formatDays(days)}</div>
              </div>
            );
          })}
        </div>
        <div className="SumColumns-columnItem is-total">
          <div className="SumColumns-columnItemTitle">Всего:</div>
          <div className="SumColumns-columnItemValue">{formatDays(total)}</div>
        </div>
      </div>
    );
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{dayNum: this.state.animatorCurrValue.dayNum}].concat(this.state.animatorCurrValues),
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (
          (oldValues[0].dayNum !== newValues[0].dayNum) ||
          oldValues.some((oldItem, index) => oldItem.dayNum !== newValues[index].dayNum)
        );
      },
      onValueChange: (newValues) => this.setState({
        animatorCurrValue: newValues[0],
        animatorCurrValues: newValues.slice(1),
      }),
    });
  }
}
