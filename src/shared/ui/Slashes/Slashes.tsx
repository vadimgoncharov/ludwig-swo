import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import navSectionData from './navSectionData';
import './Slashes.scss';

import {TDayInYear} from 'shared/types/DayInYear';
import {TTotal} from 'shared/types/Total';
type TProps = {
  dayInYear: TDayInYear,
  total: TTotal,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
};

export default class Slashes extends React.Component<TProps, TState> {
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
    const {dayInYear} = this.props;
    const animatorCurrDayNum = Math.round(this.state.animatorCurrValue.dayNum);

    return (
     <section className="Slashes">
       <SectionContent animator={this.animator} navSection={navSectionData}>
         <div className="Slashes-title">{navSectionData.title}</div>
         <div className="Slashes-subTitle">
           Изменение числа открытий сайта в&nbsp;каждый из&nbsp;дней{' '}
           по&nbsp;отношению к&nbsp;предыдущему, выраженное псевдографикой:
         </div>
         <div className="Slashes-items">
           {dayInYear.map((item, index) => {
             const currValue = item.value;
             const prevValue: number = typeof dayInYear[index - 1] !== 'undefined'
               ? dayInYear[index - 1].value
               : 0;
             let content;
             const isSelected = item.dayNum === animatorCurrDayNum;
             let className = classNames('Slashes-item', {'is-selected': isSelected});
             if (currValue > prevValue) {
               content = '/';
               className = classNames(className, 'is-gt');
             } else if (currValue < prevValue) {
               content = '\\';
               className = classNames(className, 'is-lt');
             } else {
               content = '|';
               className = classNames(className, 'is-eq');
             }
             return (
               <div className={className} key={index}>
                 {content}
               </div>
             );
           })}
         </div>
       </SectionContent>
     </section>
    );
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
