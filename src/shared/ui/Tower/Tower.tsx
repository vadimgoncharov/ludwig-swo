import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import navSectionData from './navSectionData';
import './Tower.scss';

import {TTotal} from 'shared/types/Total';
import {TMinMax} from 'shared/types/MinMax';
import {TTower} from 'shared/types/Tower';
import {TDayNumsAtValue} from 'shared/types/DayNumsAtValue';
type TProps = {
  total: TTotal,
  minMax: TMinMax,
  tower: TTower,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  dayNum: number,
};

export default class Tower extends React.Component<TProps, TState> {
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
    const {tower} = this.props;
    return (
     <section className="Tower">
       <SectionContent animator={this.animator} navSection={navSectionData}>
         <div className="Tower-title">Телебашня</div>
         <div className="Tower-subTitle">
           Распределение дней в&nbsp;году по&nbsp;порядку убывания числа открытий сайта в&nbsp;этот день{' '}
           (<span className="is-prime">отмечены</span> дни, в&nbsp;которые сайт откроется простое число раз):
         </div>
         <ul className="Tower-items">
           {tower.map(this.renderItem)}
         </ul>
       </SectionContent>
     </section>
    );
  }

  private renderItem = (item: TDayNumsAtValue, index: number) => {
    const currDayNumber = Math.round(this.state.animatorCurrValue.dayNum);
    const hasDates = item.dayNums.length > 0;
    const className = classNames('Tower-item', `is-hasDates_${hasDates ? 'yes' : 'no'}`, {
      'is-hasSelectedDate': item.dayNums.find((dayNum) => dayNum === currDayNumber),
      'is-prime': item.isPrimeValue,
    });
    return (
      <li className={className} key={index}>
        <div className="Tower-itemValue">{item.value}</div>
        <div className="Tower-itemDates">{!hasDates ? '—' : item.dayNums.map((dayNum, di) => {
          const itemClassName = classNames('Tower-itemDate', {
            'is-selected': dayNum === currDayNumber,
          });
          return (
            <div className={itemClassName} key={di}>{dayNumToDayMonthAccusative(dayNum)}</div>
          );
        })}</div>
        <div className="Tower-itemValue is-hidden" />
      </li>
    );
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{dayNum: this.state.animatorCurrValue.dayNum}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => oldValues[0].dayNum !== newValues[0].dayNum,
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
