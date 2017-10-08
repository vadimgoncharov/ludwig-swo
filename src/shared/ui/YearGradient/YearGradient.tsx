import * as React from 'react';
import {ReactElement} from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {
  ANIMATION_DURATION_DEFAULT,
  DAY_NUM_FIRST_IN_YEAR,
  DAY_NUM_LAST_IN_YEAR,
} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import {convertRange} from 'shared/utils/math';
import navSectionData from './navSectionData';
import './YearGradient.scss';

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

export default class YearGradient extends React.Component<TProps, TState> {
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
    return (
     <section className="YearGradient">
       <SectionContent animator={this.animator} navSection={navSectionData}>
         <div className="YearGradient-title">{navSectionData.title}</div>
         <div className="YearGradient-sections">
           {this.renderSectionValueSorted()}
           {this.renderSectionDateSorted()}
         </div>
       </SectionContent>
     </section>
    );
  }

  private getBackgroundColorByValue(value: number): string {
    const {minMax} = this.props;
    const max = minMax[0].value;
    const min = minMax[minMax.length - 1].value;
    const decAsHex = Math.round(convertRange(value, min, max, 0, 255));
    return `rgb(${decAsHex}, 0, 0)`;
  }

  private renderItems(items: TDayInYear) {
    const currDayNumber = Math.round(this.state.animatorCurrValue.dayNum);
    return (
      <div className="YearGradient-sectionItems">
        {items.map((item, index) => {
          const isSelected: boolean = currDayNumber === item.dayNum;
          const className = classNames('YearGradient-sectionItem', {
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

  private renderSection(title: ReactElement<any>, items: TDayInYear, dateFirst: string, dateLast: string) {
    return (
      <div className="YearGradient-section">
        <div className="YearGradient-sectionTitle">{title}</div>
        <div className="YearGradient-sectionContent">
          <div className="YearGradient-sectionItemFirst">{dateFirst}</div>
          <div className="YearGradient-sectionItems">
            {this.renderItems(items)}
          </div>
          <div className="YearGradient-sectionItemLast">{dateLast}</div>
        </div>
      </div>
    );
  }

  private renderSectionValueSorted() {
    const {dayInYear, minMax} = this.props;
    const dayInYearSortedByValue = dayInYear.slice().sort((a, b) => {
      return b.value - a.value;
    });
    return this.renderSection(
      <span>
        Все дни года, раскрашенные по&nbsp;частооткрываемости сайта и&nbsp;расставленные в&nbsp;этом&nbsp;же порядке:
      </span>,
      dayInYearSortedByValue,
      dayNumToDayMonthAccusative(minMax[0].dayNum),
      dayNumToDayMonthAccusative(minMax[minMax.length - 1].dayNum),
    );
  }

  private renderSectionDateSorted() {
    const {dayInYear} = this.props;
    return this.renderSection(
      <span>
        Все дни года, раскрашенные по&nbsp;частооткрываемости сайта, но расставленные в&nbsp;календарном порядке:
      </span>,
      dayInYear,
      dayNumToDayMonthAccusative(DAY_NUM_FIRST_IN_YEAR),
      dayNumToDayMonthAccusative(DAY_NUM_LAST_IN_YEAR),
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
