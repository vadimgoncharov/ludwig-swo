import * as React from 'react';
import * as classNames from 'classnames';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import * as utils from 'shared/utils';

import navSectionData from './navSectionData';

import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMonthsDay} from 'shared/types/StatMonthsDay';
import {TStatMonths} from 'shared/types/StatMonths';

import './SumColumns.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
  statMonths: TStatMonths,
  statMonthsDay: TStatMonthsDay,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
  animatorCurrValues: TAnimatorValue[],
};

type TAnimatorValue = {
  time: number,
  value?: number,
};

export default class StatTower extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      time: 0,
    },
    animatorCurrValues: [],
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();

    // We can not iterate throuth props.statMonthsDay directly,
    // because it could have less then 12 month
    // example: curr day of date is 31, so we will not have 31 february
    this.state.animatorCurrValues = Array.apply(null, Array(12)).map((_, monthIndex) => {
      const statMonthsDayItem = props.statMonthsDay[monthIndex];
      if (typeof statMonthsDayItem !== 'undefined') {
        return {
          time: statMonthsDayItem.date.getTime(),
          value: statMonthsDayItem.value,
        };
      }
      const date = new Date();
      date.setMonth(monthIndex);
      return {
        time: date.getTime(),
        value: 0,
      }
    });

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.animator.start([{time: newDate.getTime()}].concat(nextProps.statMonthsDay.map((item) => {
      return {
        time: item.date.getTime(),
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
    const {statMonths} = this.props;
    const totalValue: number = this.props.statTotal.value;
    const currMonth = new Date(this.state.animatorCurrValue.time).getMonth();

    return (
      <div className="SumColumns-column">
        <div className="SumColumns-columnTitle">Вероятность открытия сайта по&nbsp;месяцам:</div>
        <div className="SumColumns-columnItems">
          {statMonths.map((item, index) => {
            const chance = (item.value * 100 / totalValue).toFixed(2);
            const itemClassName = classNames('SumColumns-columnItem', {
              'is-selected': item.date.getMonth() === currMonth,
            });
            return (
              <div className={itemClassName} key={index}>
                <div className="SumColumns-columnItemTitle">в {utils.date.dateToMonthPrepositional(item.date)}</div>
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
    const {statMonthsDay} = this.props;
    const {animatorCurrValues} = this.state;
    const day = (new Date(animatorCurrValues[0].time)).getDate();
    const total = Math.round(statMonthsDay.reduce((sum, item, index) => {
      return sum + animatorCurrValues[index].value;
    }, 0));
    const currMonth = new Date(this.state.animatorCurrValue.time).getMonth();

    return (
      <div className="SumColumns-column">
        <div className="SumColumns-columnTitle">
          Количество открытий{' '}
          <span className="SumColumns-columnTitleDays">по {day} числам:</span>
        </div>
        <div className="SumColumns-columnItems">
          {statMonthsDay.map((item, index) => {
            const itemClassName = classNames('SumColumns-columnItem', {
              'is-selected': item.date.getMonth() === currMonth,
            });
            return (
              <div className={itemClassName} key={index}>
                <div className="SumColumns-columnItemTitle">
                  {utils.date.dateToDayMonthAccusative(new Date(animatorCurrValues[index].time))}
                </div>
                <div className="SumColumns-columnItemValue">
                  {utils.format.formatValueToTimesWithPluralize(Math.round(animatorCurrValues[index].value))}
                </div>
              </div>
            );
          })}
          <div className="SumColumns-columnItem is-total">
            <div className="SumColumns-columnItemTitle">Всего:</div>
            <div className="SumColumns-columnItemValue">{utils.format.formatValueToTimesWithPluralize(total)}</div>
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
    const currMonth = new Date(this.state.animatorCurrValue.time).getMonth();

    return (
      <div className="SumColumns-column">
        <div className="SumColumns-columnTitle is-short">В&nbsp;високосном году:</div>
        <div className="SumColumns-columnItems">
          {daysInMonth.map((days, index) => {
            const itemClassName = classNames('SumColumns-columnItem', {
              'is-selected': index === currMonth,
            });
            const month = new Date();
            month.setMonth(index);
            return (
              <div className={itemClassName} key={index}>
                <div className="SumColumns-columnItemTitle">в {utils.date.dateToMonthPrepositional(month)}</div>
                <div className="SumColumns-columnItemValue">{utils.format.formatDays(days)}</div>
              </div>
            );
          })}
        </div>
        <div className="SumColumns-columnItem is-total">
          <div className="SumColumns-columnItemTitle">Всего:</div>
          <div className="SumColumns-columnItemValue">{utils.format.formatDays(total)}</div>
        </div>
      </div>
    );
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}].concat(this.state.animatorCurrValues),
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (
          (
            utils.date.dateToYYYYMMDD(new Date(oldValues[0].time)) !==
            utils.date.dateToYYYYMMDD(new Date(newValues[0].time))
          ) ||
          oldValues.some((oldItem, index) => {
            const oldDate = utils.date.dateToYYYYMMDD(new Date(oldItem.time));
            const newDate = utils.date.dateToYYYYMMDD(new Date(newValues[index].time));

            return oldDate !== newDate;
          })
        );
      },
      onValueChange: (newValues) => this.setState({
        animatorCurrValue: newValues[0],
        animatorCurrValues: newValues.slice(1),
      }),
    });
  }
}
