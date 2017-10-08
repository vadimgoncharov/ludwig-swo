import * as React from 'react';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';
import SectionContent from 'shared/ui/SectionContent/SectionContent';
import Animator from 'shared/services/Animator';
import {dayNumToData, dayNumToMonthNominative} from 'shared/utils/date';
import {convertRange} from 'shared/utils/math';
import {caplitalizeFirstLetter} from 'shared/utils/format';
import navSectionData from './navSectionData';
import './MonthInClouds.scss';

import {TDayInYear} from 'shared/types/DayInYear';
import {TTotal} from 'shared/types/Total';
import {TMinMax} from 'shared/types/MinMax';
type TProps = {
  isFetching: boolean,
  dayInYear: TDayInYear,
  total: TTotal,
  minMax: TMinMax,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
};

export default class MonthInClouds extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      dayNum: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;
  private titleElement: HTMLElement;
  private titleMonthValueElement: HTMLElement;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.animator = this.createAnimator();
  }

  public componentDidMount() {
    this.recalculateTitleWidth();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.total.dayNum;
    const newDate = nextProps.total.dayNum;

    if (oldDate === newDate) {
      return;
    }

    this.animator.start([{dayNum: newDate}]);
    setTimeout(() => {
      this.recalculateTitleWidth();
    });
  }

  public render() {
    const {dayInYear} = this.props;
    const currDayNum = Math.round(this.state.animatorCurrValue.dayNum);
    const {day: currDay, month: currMonth} = dayNumToData(currDayNum);
    const days = dayInYear.filter((item) => dayNumToData(item.dayNum).month === currMonth);
    const {min, max} = this.getCurrMonthMinMax();

    return (
     <section className="MonthInClouds">
       <SectionContent animator={this.animator} navSection={navSectionData}>
         {this.renderTitle()}
         <div className="MonthInClouds-items">
           {Array.apply(null, Array(31)).map((_, index) => {
             const item = days[index];
             const dayNum = index + 1;
             let sizeStyle;
             let isVisible = false;
             let day = 0;
             if (typeof item !== 'undefined') {
               day = dayNumToData(item.dayNum).day;
               isVisible = true;
               const {value} = days[index];
               // Initial font-size in CSS == 42px
               // So we downscale it to 42px / 3 = 14px (min font-size)
               // Or do nothing, so it will have font-size = 42px (max font-size)
               // We need it, because Safari renders upscaled font-size very badly
               const fontSize = convertRange(value, min, max, 1 / 3, 1).toFixed(2);
               sizeStyle = {
                 transform: `scale(${fontSize})`,
               };
             }
             const itemClassName = classNames('MonthInClouds-item', `is-visible_${isVisible ? 'yes' : 'no'}`, {
               'is-selected': currDay === day,
             });
             return (
               <div className={itemClassName} key={index} style={sizeStyle}>
                 {dayNum}
               </div>
             );
           })}
         </div>
       </SectionContent>
     </section>
    );
  }

  private renderTitle() {
    const currDayNum = this.props.total.dayNum;
    const {month} = dayNumToData(currDayNum);
    const currMonthStr = caplitalizeFirstLetter(dayNumToMonthNominative(currDayNum));

    return (
      <div className="MonthInClouds-title" ref={this.onTitleRefSet}>
        <CSSTransitionGroup
          className="MonthInClouds-titleMonth"
          component="span"
          transitionName="slide"
          transitionEnterTimeout={1400}
          transitionLeaveTimeout={1400}
        >
          <span
            className="MonthInClouds-titleMonthValue"
            ref={this.onTitleMonthValueRefSet}
            key={month}
          >
            {currMonthStr}
          </span>
        </CSSTransitionGroup>{' '}
        <span className="MonthInClouds-titleText">
          в облаках:
        </span>
      </div>
    );
  }

  private onTitleRefSet = (ref) => {
    this.titleElement = ref;
  };

  private onTitleMonthValueRefSet = (ref) => {
    this.titleMonthValueElement = ref;
  };

  private recalculateTitleWidth() {
    const {titleElement, titleMonthValueElement} = this;
    if (titleElement && titleMonthValueElement) {
      const titleMonthElement = titleElement.children.item(0);
      if (titleMonthElement instanceof HTMLElement) {
        titleMonthElement.style.width =  `${titleMonthValueElement.offsetWidth}px`;
      }
    }
  }

  private getCurrMonthMinMax(): {min: number, max: number} {
    const {total, dayInYear} = this.props;
    const currDayNum = total.dayNum;
    const {month: currMonth} = dayNumToData(currDayNum);
    const days = dayInYear.filter((item) => {
      const {month} = dayNumToData(item.dayNum);
      return currMonth === month;
    });
    let min = days[0].value;
    let max = days[0].value;
    days.forEach((item) => {
      min = Math.min(min, item.value);
      max = Math.max(max, item.value);
    });
    return {min, max};
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{dayNum: this.state.animatorCurrValue.dayNum}],
      duration: 1000,
      comparator: (oldValues, newValues) => oldValues[0].dayNum !== newValues[0].dayNum,
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
