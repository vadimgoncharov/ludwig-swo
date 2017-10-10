import * as React from 'react';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import navSectionData from './navSectionData';
import './HalfYear.scss';

import {THalfYear} from 'shared/types/HalfYear';
type TProps = {
  halfYear: THalfYear,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  first: number,
  second: number,
};

const FRACTION_NUMBER_COUNT = 12;

export default class HalfYear extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      first: 0,
      second: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.first = props.halfYear.first;
    this.state.animatorCurrValue.second = props.halfYear.second;

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldFirst = this.props.halfYear.first;
    const oldSecond = this.props.halfYear.second;
    const newFirst = nextProps.halfYear.first;
    const newSecond = nextProps.halfYear.second;

    if (oldFirst === newFirst && oldSecond === newSecond) {
      return;
    }

    this.animator.start([{first: newFirst, second: newSecond}]);
  }

  public render() {
    const {first, second} = this.state.animatorCurrValue;
    const total = first + second;
    const firstInPercent: string = (first * 100 / total).toFixed(FRACTION_NUMBER_COUNT);
    const secondInPercent: string = (second * 100 / total).toFixed(FRACTION_NUMBER_COUNT);

    const result: string = (parseFloat(firstInPercent) / parseFloat(secondInPercent)).toFixed(FRACTION_NUMBER_COUNT);

    return (
      <section className="HalfYear">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="HalfYear-title">50 на 50</div>
          <div className="HalfYear-subTitle">
            Отношение числа открытий сайта в&nbsp;первом полугодии к&nbsp;числу открытий во&nbsp;втором полугодии:
          </div>
          <div className="HalfYear-items">
            <span className="HalfYear-item is-first">{firstInPercent}%</span>{' '}
            <span className="HalfYear-item is-division">
            <span className="HalfYear-itemInner">÷</span>
          </span>{' '}
            <span className="HalfYear-item is-second">{secondInPercent}%</span>{' '}
            <span className="HalfYear-item is-equal">=</span>{' '}
            <span className="HalfYear-item is-result">{result}</span>
          </div>
        </SectionContent>
      </section>
    )
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{first: this.state.animatorCurrValue.first, second: this.state.animatorCurrValue.second}],
      duration: ANIMATION_DURATION_DEFAULT,
      roundValues: false,
      comparator: (oldValues, newValues) => {
        return (oldValues[0].first !== newValues[0].first || oldValues[0].second !== newValues[0].second)
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
