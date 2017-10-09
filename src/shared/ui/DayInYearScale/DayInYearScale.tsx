import * as React from 'react';
import * as classNames from 'classnames';
import SectionContent from 'shared/ui/SectionContent/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {DAYS_IN_YEAR} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import navSectionData from './navSectionData';
import './DayInYearScale.scss';

import {TTotal} from 'shared/types/Total';
type TProps = {
  total: TTotal,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
};

export default class DayInYearScale extends React.Component<TProps, TState> {
  public state = {
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
    const oldDate = this.props.total.dayNum;
    const newDate = nextProps.total.dayNum;

    if (oldDate === newDate) {
      return;
    }

    this.animator.start([{dayNum: newDate}]);
  }

  public render() {
    const currDayNum = Math.round(this.state.animatorCurrValue.dayNum);
    const dateStr: string = dayNumToDayMonthAccusative(currDayNum);

    return (
      <section className="DayInYearScale">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="DayInYearScale-title">{dateStr} в году:</div>
          <ol className="DayInYearScale-items">
          {Array.apply(null, Array(DAYS_IN_YEAR)).map((_, dayNum) => {
            const className = classNames('DayInYearScale-item', {'is-selected': dayNum === currDayNum});
            return (
              <li className={className} key={dayNum} />
            );
          })}
          </ol>
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
