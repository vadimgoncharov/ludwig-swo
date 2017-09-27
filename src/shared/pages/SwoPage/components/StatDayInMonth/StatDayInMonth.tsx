import * as React from 'react';
import * as classNames from 'classnames';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import * as utils from 'shared/utils';

import navSectionData from './navSectionData';

import {
  TStatDayInMonth,
  TStatDayInMonthValue,
} from 'shared/types/StatDayInMonth';
import {TStatTotal} from 'shared/types/StatTotal';

import './StatDayInMonth.scss';
import {dateToColor} from 'shared/utils/date';

type TProps = {
  isFetching: boolean,
  statDayInMonth: TStatDayInMonth,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

const COLUMN_MAX_HEIGHT = 200;

export default class StatDayInMonth extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      time: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.animator.start([{time: newDate.getTime()}]);
  }

  public render() {
    const {statDayInMonth} = this.props;
    // const animatorCurrDayNum = new Date(this.state.animatorCurrValue.time).getDate();
    const animatorCurrDayNum = this.props.statTotal.date.getDate();
    const maxValue = this.getMaxValue();

    return (
      <section className="StatDayInMonth">
        <SectionContent navSection={navSectionData}>
          <div className="StatDayInMonth-title">{navSectionData.title}</div>
          <div className="StatDayInMonth-subTitle">
            Распределение открытия сайта по&nbsp;порядковым номерам дней в&nbsp;месяце:
          </div>
          <div className="StatDayInMonth-items">
            {statDayInMonth.map((item, index) => {
              const {dayNum, value} = item;
              const columnSize = COLUMN_MAX_HEIGHT * value / maxValue;
              const className = classNames(
                'StatDayInMonth-item',
                {'is-selected': dayNum === animatorCurrDayNum},
              );
              const itemColumnClassNameVertical = classNames(
                'StatDayInMonth-itemColumn is-vertical',
              );
              const itemColumnClassNameHorizontal = classNames(
                'StatDayInMonth-itemColumn is-horizontal',
              );
              const gradientValue = this.getGradientValue(item);
              const styleVertical: {height: string, background?: string} = {
                height: `${columnSize}px`,
                background: `linear-gradient(to bottom, ${gradientValue})`,
              };
              const styleHorizontal: {width: string, background?: string} = {
                width: `${columnSize}px`,
                background: `linear-gradient(to right, ${gradientValue})`,
              };
              // if (dayNum === animatorCurrDayNum) {
              //   styleVertical.background = `linear-gradient(to bottom, ${gradientValue})`;
              //   styleHorizontal.background = `linear-gradient(to bottom, ${gradientValue})`;
              // }
              return (
                <div className={className} key={index}>
                  <div className="StatDayInMonth-itemDayNum">{dayNum}</div>
                  <div className={itemColumnClassNameVertical} style={styleVertical} />
                  <div className={itemColumnClassNameHorizontal} style={styleHorizontal} />
                </div>
              );
            })}
          </div>
        </SectionContent>
      </section>
    );
  }

  private getGradientValue(dayInMonthItem: TStatDayInMonthValue) {
    const data: Array<{bgColor: string, percent: number}> = [];
    const daysValuesSumTotal = dayInMonthItem.value;

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const daysValuesSumAtMonth = dayInMonthItem.months[monthIndex];
      if (daysValuesSumAtMonth === 0) {
        continue;
      }
      const percent = daysValuesSumAtMonth / daysValuesSumTotal * 100;
      const {bgColor} = dateToColor(new Date(2017, monthIndex, dayInMonthItem.dayNum));
      data.push({bgColor, percent});
    }

    let percentAlreadyTaken = 0;
    return data.map((item) => {
      const gradStr = `${item.bgColor} ${percentAlreadyTaken}%`;
      percentAlreadyTaken += item.percent;
      return gradStr;
    }).filter((item, index) => {
      return (index % 2 === 0)
    }).join(', ');
  }

  private getMaxValue(): number {
     return this.props.statDayInMonth.reduce((sum: number, item) => {
       return Math.max(sum, item.value);
     }, 0);
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (
          utils.date.dateToYYYYMMDD(new Date(oldValues[0].time)) !==
          utils.date.dateToYYYYMMDD(new Date(newValues[0].time))
        );
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
