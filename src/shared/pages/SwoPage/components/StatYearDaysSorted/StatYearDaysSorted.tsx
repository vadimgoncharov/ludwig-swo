import * as React from 'react';
import {ReactElement} from 'react';
import * as classNames from 'classnames';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {
  dateToDayMonthAccusative,
  dateToYYYYMMDD,
  getDayNumberInYearByDate,
  getYearFirstDayDate,
  getYearLastDayDate,
} from 'shared/utils/date';
import {convertRange} from 'shared/utils/math';

import navSectionData from './navSectionData';

import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMinMax} from 'shared/types/StatMinMax';

import './StatYearDaysSorted.scss';

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

export default class StatYearDaysSorted extends React.Component<TProps, TState> {
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
    return (
     <section className="StatYearDaysSorted">
       <SectionContent animator={this.animator} navSection={navSectionData}>
         <div className="StatYearDaysSorted-title">{navSectionData.title}</div>
         <div className="StatYearDaysSorted-sections">
           {this.renderSectionValueSorted()}
           {this.renderSectionDateSorted()}
         </div>
       </SectionContent>
     </section>
    );
  }

  private getBackgroundColorByValue(value: number): string {
    const {statMinMax} = this.props;
    const max = statMinMax[0].value;
    const min = statMinMax[statMinMax.length - 1].value;
    const decAsHex = Math.round(convertRange(value, min, max, 0, 255));
    return `rgb(${decAsHex}, 0, 0)`;
  }

  private renderItems(items: TStatDayInYear) {
    const currDayNumber = getDayNumberInYearByDate(new Date(this.state.animatorCurrValue.time));
    return (
      <div className="StatYearDaysSorted-sectionItems">
        {items.map((item, index) => {
          const isSelected: boolean = currDayNumber === item.dayNum;
          const className = classNames('StatYearDaysSorted-sectionItem', {
            'is-selected': isSelected,
          });
          const style = !isSelected ? {backgroundColor: this.getBackgroundColorByValue(item.value)} : null;
          return (
            <div className={className} key={index} style={style} />
          );
        })}
      </div>
    );
  }

  private renderSection(title: ReactElement<any>, items: TStatDayInYear, dateFirst: string, dateLast: string) {
    return (
      <div className="StatYearDaysSorted-section">
        <div className="StatYearDaysSorted-sectionTitle">{title}</div>
        <div className="StatYearDaysSorted-sectionContent">
          <div className="StatYearDaysSorted-sectionItemFirst">{dateFirst}</div>
          <div className="StatYearDaysSorted-sectionItems">
            {this.renderItems(items)}
          </div>
          <div className="StatYearDaysSorted-sectionItemLast">{dateLast}</div>
        </div>
      </div>
    );
  }

  private renderSectionValueSorted() {
    const {statDayInYear, statMinMax} = this.props;
    const statDayInYearSortedByValue = statDayInYear.slice().sort((a, b) => {
      return b.value - a.value;
    });
    return this.renderSection(
      <span>
        Все дни года, раскрашенные по&nbsp;частооткрываемости сайта и&nbsp;расставленные в&nbsp;этом&nbsp;же порядке:
      </span>,
      statDayInYearSortedByValue,
      dateToDayMonthAccusative(statMinMax[0].date),
      dateToDayMonthAccusative(statMinMax[statMinMax.length - 1].date),
    );
  }

  private renderSectionDateSorted() {
    const {statDayInYear} = this.props;
    return this.renderSection(
      <span>
        Все дни года, раскрашенные по&nbsp;частооткрываемости сайта, но расставленные в&nbsp;календарном порядке:
      </span>,
      statDayInYear,
      dateToDayMonthAccusative(getYearFirstDayDate()),
      dateToDayMonthAccusative(getYearLastDayDate()),
    );
  }

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
