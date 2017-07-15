import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';

import * as utils from 'shared/utils';


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
  isAnimationEnabled: boolean,
};

export default class MonthInClouds extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    isAnimationEnabled: false,
  };

  public render() {
    const {statTotal, statDayInYear} = this.props;
    const {isAnimationEnabled} = this.state;
    const currDate = statTotal.date;
    const currMonthStr = utils.format.caplitalizeFirstLetter(utils.date.dateToMonthNominative(currDate));

    const days = statDayInYear.filter((item) => {
      const date = utils.date.getDateByDayNumberInYear(item.dayNum);
      return currDate.getMonth() === date.getMonth();
    });

    const {min, max} = this.getCurrMonthMinMax();

    const rootClassName = classNames('MonthInClouds', {
      'is-animationEnabled': isAnimationEnabled,
    });
    return (
      <Waypoint onEnter={this.enableAnimation} onLeave={this.disableAnimation}>
       <div className={rootClassName}>
         <div className="MonthInClouds-title">
           <span className="MonthInClouds-titleMonth">{currMonthStr}</span>{' '}
           в облаках:
         </div>
         <div className="MonthInClouds-items">
           {Array.apply(null, Array(31)).map((_, index) => {
             const item = days[index];
             const dayNum = index + 1;
             let sizeStyle;
             let isVisible = false;
             if (typeof item !== 'undefined') {
               isVisible = true;
               const {value} = days[index];
               const fontSize = Math.round(utils.math.convertRange(value, min, max, 14, 42));
               sizeStyle = {
                 fontSize: `${fontSize}px`,
               };
             }
             const itemClassName = classNames('MonthInClouds-item', `is-visible_${isVisible ? 'yes' : 'no'}`, {
               'is-selected': currDate.getDate() === dayNum,
             });
             return (
               <div className={itemClassName} key={index} style={sizeStyle}>
                 {utils.date.getDateByDayNumberInYear(dayNum).getDate()}
               </div>
             );
           })}
         </div>
       </div>
      </Waypoint>
    );
  }

  private enableAnimation = () => {
    this.setState({
      isAnimationEnabled: true,
    });
  };

  private disableAnimation = () => {
    this.setState({
      isAnimationEnabled: false,
    });
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
}
