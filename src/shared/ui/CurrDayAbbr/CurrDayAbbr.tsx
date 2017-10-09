import * as React from 'react';

import SectionContent from 'shared/ui/SectionContent/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import navSectionData from './navSectionData';
import {
  dayNumToDayMonthAbbr,
  dayNumToDayMonthAccusative,
} from 'shared/utils/date';
import './CurrDayAbbr.scss';

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

export default class CurrDayAbbr extends React.Component<TProps, TState> {
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
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldDayNum === newDayNum) {
      return;
    }

    this.animator.start([{dayNum: newDayNum}]);
  }

  public render() {
    const currDayNum = Math.round(this.state.animatorCurrValue.dayNum);
    const dateStr = dayNumToDayMonthAccusative(currDayNum);
    const abbr = dayNumToDayMonthAbbr(currDayNum);
    return (
      <section className="CurrDayAbbr">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="CurrDayAbbr-title">{navSectionData.title}</div>
          <div className="CurrDayAbbr-description">
            Дата открытия сайта {dateStr} в&nbsp;сокращенном виде:
          </div>
          <abbr className="CurrDayAbbr-abbr">«{abbr}»</abbr>
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
