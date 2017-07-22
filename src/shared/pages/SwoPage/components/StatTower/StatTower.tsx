import * as React from 'react';
import * as classNames from 'classnames';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {
  dateToDayMonthAccusative,
  dateToYYYYMMDD,
  getDayNumberInYearByDate,
} from 'shared/utils/date';

import navSectionData from './navSectionData';

import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMinMax} from 'shared/types/StatMinMax';
import {TStatTower} from 'shared/types/StatTower';

import './StatTower.scss';
import {TStatDatesAtValue} from 'shared/types/StatDatesAtValue';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
  statMinMax: TStatMinMax,
  statTower: TStatTower,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class StatTower extends React.Component<TProps, TState> {
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
    const {statTower} = this.props;
    return (
     <section className="StatTower">
       <SectionContent animator={this.animator} navSection={navSectionData}>
         <div className="StatTower-title">Телебашня</div>
         <div className="StatTower-subTitle">
           Распределение дней в&nbsp;году по&nbsp;порядку убывания числа открытий сайта в&nbsp;этот день{' '}
           (<span className="is-prime">отмечены</span> дни, в&nbsp;которые сайт откроется простое число раз):
         </div>
         <ul className="StatTower-items">
           {statTower.map(this.renderItem)}
         </ul>
       </SectionContent>
     </section>
    );
  }

  private renderItem = (item: TStatDatesAtValue, index: number) => {
    const currDayNumber = getDayNumberInYearByDate(new Date(this.state.animatorCurrValue.time));
    const hasDates = item.dates.length > 0;
    const className = classNames('StatTower-item', `is-hasDates_${hasDates ? 'yes' : 'no'}`, {
      'is-hasSelectedDate': item.dates.find((date) => getDayNumberInYearByDate(date) === currDayNumber),
      'is-prime': item.isPrimeValue,
    });
    return (
      <li className={className} key={index}>
        <div className="StatTower-itemValue">{item.value}</div>
        <div className="StatTower-itemDates">{!hasDates ? '—' : item.dates.map((date, di) => {
          const itemClassName = classNames('StatTower-itemDate', {
            'is-selected': getDayNumberInYearByDate(date) === currDayNumber,
          });
          return (
            <div className={itemClassName} key={di}>{dateToDayMonthAccusative(date)}</div>
          );
        })}</div>
        <div className="StatTower-itemValue is-hidden" />
      </li>
    );
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (dateToYYYYMMDD(new Date(oldValues[0].time)) !== dateToYYYYMMDD(new Date(newValues[0].time)));
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
