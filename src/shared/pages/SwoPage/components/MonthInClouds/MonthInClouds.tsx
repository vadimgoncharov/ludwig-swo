import * as React from 'react';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import * as utils from 'shared/utils';

import navSectionData from './navSectionData';

import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMinMax} from 'shared/types/StatMinMax';

import './MonthInClouds.scss';

type TProps = {
  isFetching: boolean,
  statDayInYear: TStatDayInYear,
  statTotal: TStatTotal,
  statMinMax: TStatMinMax,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class MonthInClouds extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      time: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;
  private titleElement: HTMLElement;
  private titleMonthValueElement: HTMLElement;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
    this.animator = this.createAnimator();
  }

  public componentDidMount() {
    this.recalculateTitleWidth();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.animator.start([{time: newDate.getTime()}]);
    setTimeout(() => {
      this.recalculateTitleWidth();
    });
  }

  public render() {
    const {statTotal, statDayInYear} = this.props;
    const currDate = statTotal.date;
    const currDayNum = new Date(this.state.animatorCurrValue.time).getDate();

    const days = statDayInYear.filter((item) => {
      const date = utils.date.getDateByDayNumberInYear(item.dayNum);
      return currDate.getMonth() === date.getMonth();
    });

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
             if (typeof item !== 'undefined') {
               isVisible = true;
               const {value} = days[index];
               // Initial font-size in CSS == 42px
               // So we downscale it to 42px / 3 = 14px (min font-size)
               // Or do nothing, so it will have font-size = 42px (max font-size)
               // We need it, because Safari renders upscaled font-size very badly
               const fontSize = utils.math.convertRange(value, min, max, 1 / 3, 1).toFixed(2);
               sizeStyle = {
                 transform: `scale(${fontSize})`,
               };
             }
             const itemClassName = classNames('MonthInClouds-item', `is-visible_${isVisible ? 'yes' : 'no'}`, {
               'is-selected': currDayNum === dayNum,
             });
             return (
               <div className={itemClassName} key={index} style={sizeStyle}>
                 {utils.date.getDateByDayNumberInYear(dayNum).getDate()}
               </div>
             );
           })}
         </div>
       </SectionContent>
     </section>
    );
  }

  private renderTitle() {
    const currDate = this.props.statTotal.date;
    const currMonthStr = utils.format.caplitalizeFirstLetter(utils.date.dateToMonthNominative(currDate));

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
            key={currDate.getMonth()}
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
    const {statTotal, statDayInYear} = this.props;
    const currMonth = statTotal.date.getMonth();
    const days = statDayInYear.filter((item) => {
      const date = utils.date.getDateByDayNumberInYear(item.dayNum);
      return currMonth === date.getMonth();
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
      from: [{time: this.state.animatorCurrValue.time}],
      duration: 1000,
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
