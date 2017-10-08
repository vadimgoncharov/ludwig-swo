import * as React from 'react';
import * as pluralize from 'plural-ru';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import navSectionData from './navSectionData';
import './MinMax.scss';

import {TMinMax} from 'shared/types/MinMax';
import {TValueAtDayNum} from 'shared/types/ValueAtDayNum';

type TProps = {
  isFetching: boolean,
  minMax: TMinMax,
};
type TState = {
  animatorCurrValues: TAnimatorValue[],
};
type TAnimatorValue = {
  dayNum: number,
  value: number,
};

export default class MinMax extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValues: [],
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValues = props.minMax.map((item): TAnimatorValue => {
      return {
        dayNum: item.dayNum,
        value: item.value,
      };
    });

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldStat = this.props.minMax;
    const newStat = nextProps.minMax;

    if (oldStat === newStat) {
      return;
    }

    this.animator.start(newStat.map((item): TAnimatorValue => {
      return {
        dayNum: item.dayNum,
        value: item.value,
      };
    }));
  }

  public render() {
    const {animatorCurrValues} = this.state;
    const items = animatorCurrValues.map((item) => {
      return {
        value: Math.round(item.value),
        dayNum: Math.round(item.dayNum),
      };
    });

    return (
      <section className="MinMax">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="MinMax-title"><abbr className="abbr">ТОП</abbr>-5 и&nbsp;позор микрорайона</div>
          <div className="MinMax-columns">
            <div className="MinMax-column is-max">
              <div className="MinMax-columnTitle">Сайт откроется чаще всего:</div>
              <ol className="MinMax-items">
                {items.slice(0, 4).map(this.renderItem)}
              </ol>
            </div>
            <div className="MinMax-column is-middle">
              <div className="MinMax-columnTitle">&nbsp;</div>
              <ol className="MinMax-items">
                <li className="MinMax-item">
                  <div className="MinMax-itemDate">...</div>
                  <div className="MinMax-itemValue">...</div>
                </li>
              </ol>
            </div>
            <div className="MinMax-column is-min">
              <div className="MinMax-columnTitle">Сайт откроется реже всего:</div>
              <ol className="MinMax-items">
                {items.slice(4).map(this.renderItem)}
              </ol>
            </div>
          </div>
        </SectionContent>
      </section>
    );
  }

  private renderItem = (item: TValueAtDayNum, index: number) => {
    const {dayNum, value} = item;
    const valueWithPostfix: string = pluralize(value, '%d раз', '%d раза', '%d раз');

    return (
      <li className="MinMax-item" key={index}>
        <div className="MinMax-itemDate">{dayNumToDayMonthAccusative(dayNum)}</div>
        <div className="MinMax-itemValue">{valueWithPostfix}</div>
      </li>
    );
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: this.state.animatorCurrValues,
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return oldValues.some((oldItem, index) => oldItem.dayNum !== newValues[index].dayNum);
      },
      onValueChange: (newValues) => this.setState({animatorCurrValues: newValues}),
    });
  }
}
