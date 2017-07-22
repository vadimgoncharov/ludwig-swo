import * as React from 'react';
import * as classNames from 'classnames';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import * as utils from 'shared/utils';

import navSectionData from './navSectionData';

import {TStatTotal} from 'shared/types/StatTotal';

import './DayInYearScale.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class DayInYearScale extends React.Component<TProps, TState> {
  public state = {
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
    const date: Date = new Date(this.state.animatorCurrValue.time);
    const dateStr: string = utils.date.dateToDayMonthAccusative(date);
    const currYear = date.getFullYear();
    const daysInYear = utils.date.getDaysCountInYear(currYear);
    const dayInYear = utils.date.getDayNumberInYear(currYear, date.getMonth(), date.getDate());

    return (
      <section className="DayInYearScale">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="DayInYearScale-title">{dateStr} в году:</div>
          {this.renderScale(daysInYear, dayInYear)}
        </SectionContent>
      </section>
    );
  }

  private renderScale(daysInYear: number, dayInYear: number) {
    const content = [];

    for (let i: number = 0; i < daysInYear; i++) {
      content.push(i);
    }

    return (
      <ol className="DayInYearScale-items">
        {content.map((item, index) => this.renderScaleItem(index, dayInYear))}
      </ol>
    );
  }

  private renderScaleItem = (index: number, dayInYear: number) => {
    const className = classNames('DayInYearScale-item', {'is-selected': index === dayInYear});
    return (
      <li className={className} key={index} />
    );
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT,
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
