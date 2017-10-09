import * as React from 'react';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {formatValueToTimesWithPluralize} from 'shared/utils/format';
import navSectionData from './navSectionData';
import './Around.scss';

import {TAround} from 'shared/types/Around';
type TProps = {
  around: TAround,
};
type TState = {
  animatorCurrValues: TAnimatorValue[],
};
type TAnimatorValue = {
  value: number,
};

export default class Around extends React.Component<TProps, TState> {
  public props: TProps;
  public state = {
    animatorCurrValues: [],
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    const {around: {yesterday, today, tomorrow}} = this.props;
    this.state.animatorCurrValues = [yesterday, today, tomorrow].map((item): TAnimatorValue => {
      return {
        value: item.value,
      };
    });

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldStat = this.props.around;
    const newStat = nextProps.around;

    const hasChange = (
      oldStat.yesterday.value !== newStat.yesterday.value ||
      oldStat.today.value !== newStat.today.value ||
      oldStat.tomorrow.value !== newStat.tomorrow.value
    );

    if (!hasChange) {
      return;
    }

    const {yesterday, today, tomorrow} = newStat;
    const newValues  = [yesterday, today, tomorrow].map((item): TAnimatorValue => {
      return {
        value: item.value,
      };
    });
    this.animator.start(newValues);
  }

  public render() {
    return (
      <section className="Around">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="Around-title">{navSectionData.title}</div>
          {this.renderArrows()}
          {this.renderValues()}
        </SectionContent>
      </section>
    );
  }

  private renderArrows() {
    const [yesterday, today, tomorrow] = this.state.animatorCurrValues;
    const min = this.getMinValue();
    const max = this.getMaxValue();

    const yesterdayArrowClassName = this.getArrowClassName('yesterday', yesterday.value, min, max);
    const todayArrowClassName     = this.getArrowClassName('today', today.value, min, max);
    const tomorrowArrowClassName  = this.getArrowClassName('tomorrow', tomorrow.value, min, max);

    return (
      <div className="Around-arrows">
        <span className={yesterdayArrowClassName}>&larr;</span>
        <span className={todayArrowClassName}>&#8212;</span>
        <span className={tomorrowArrowClassName}>&rarr;</span>
      </div>
    );
  }

  private renderValues() {
    const [yesterday, today, tomorrow] = this.state.animatorCurrValues;
    const yesterdayValueFormatted = this.getFormattedValue(yesterday.value);
    const todayValueFormatted     = this.getFormattedValue(today.value);
    const tomorrowValueFormatted  = this.getFormattedValue(tomorrow.value);

    return (
      <div className="Around-values">
        Сайт откроется <span className="Around-value">вчера&nbsp;&larr; {yesterdayValueFormatted}</span>,{' '}
        <span className="Around-value">сегодня&nbsp;&#8212; {todayValueFormatted}</span>,{' '}
        <span className="Around-value">завтра&nbsp;&rarr; {tomorrowValueFormatted}</span>
      </div>
    );
  }

  private getFormattedValue(value: number): string {
    return formatValueToTimesWithPluralize(Math.round(value));
  }

  private getArrowClassName(name: string, value: number, min: number, max: number): string {
    let className = `Around-arrow is-${name}`;
    if (value === max) {
      className += ' is-max';
    }
    else if (value === min) {
      className += ' is-min';
    }
    else {
      className += ' is-normal';
    }
    return className;
  }

  private getMaxValue(): number {
    const {yesterday, today, tomorrow} = this.props.around;
    return Math.max(
      yesterday.value,
      today.value,
      tomorrow.value,
    );
  }

  private getMinValue(): number {
    const {yesterday, today, tomorrow} = this.props.around;
    return Math.min(
      yesterday.value,
      today.value,
      tomorrow.value,
    );
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: this.state.animatorCurrValues,
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return oldValues.some((oldItem, index) => {
          const oldValue = Math.round(oldItem.value);
          const newValue = Math.round(newValues[index].value);

          return oldValue !== newValue;
        });
      },
      onValueChange: (newValues) => this.setState({animatorCurrValues: newValues}),
    });
  }
}
