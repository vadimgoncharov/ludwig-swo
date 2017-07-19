import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as pluralize from 'plural-ru';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dateToDayMonthAccusative, dateToYYYYMMDD} from 'shared/utils/date';

import {TStatMinMax} from 'shared/types/StatMinMax';
import {TStatValueAtDate} from 'shared/types/StatValueAtDate';

import './StatMinMax.scss';

type TProps = {
  isFetching: boolean,
  statMinMax: TStatMinMax,
};

type TState = {
  animatorCurrValues: TAnimatorValue[],
};

type TAnimatorValue = {
  time: number,
  value: number,
};

export default class StatMinMax extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValues: [],
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValues = props.statMinMax.map((item): TAnimatorValue => {
      return {
        time: item.date.getTime(),
        value: item.value,
      };
    });

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldStat = this.props.statMinMax;
    const newStat = nextProps.statMinMax;

    if (oldStat === newStat) {
      return;
    }

    this.animator.start(newStat.map((item): TAnimatorValue => {
      return {
        time: item.date.getTime(),
        value: item.value,
      };
    }));
  }

  public render() {
    const {animatorCurrValues} = this.state;
    const items = animatorCurrValues.map((item) => {
      return {
        value: Math.round(item.value),
        date: new Date(item.time),
      };
    });

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatMinMax">
          <div className="StatMinMax-title"><abbr className="abbr">ТОП</abbr>-5 и&nbsp;позор микрорайона</div>
          <div className="StatMinMax-columns">
            <div className="StatMinMax-column is-max">
              <div className="StatMinMax-columnTitle">Сайт откроется чаще всего:</div>
              <ol className="StatMinMax-items">
                {items.slice(0, 4).map(this.renderItem)}
              </ol>
            </div>
            <div className="StatMinMax-column is-middle">
              <div className="StatMinMax-columnTitle">&nbsp;</div>
              <ol className="StatMinMax-items">
                <li className="StatMinMax-item">
                  <div className="StatMinMax-itemDate">...</div>
                  <div className="StatMinMax-itemValue">...</div>
                </li>
              </ol>
            </div>
            <div className="StatMinMax-column is-min">
              <div className="StatMinMax-columnTitle">Сайт откроется реже всего:</div>
              <ol className="StatMinMax-items">
                {items.slice(4).map(this.renderItem)}
              </ol>
            </div>
          </div>
        </div>
      </Waypoint>
    );
  }

  private renderItem = (item: TStatValueAtDate, index: number) => {
    const {date, value} = item;
    const valueWithPostfix: string = pluralize(value, '%d раз', '%d раза', '%d раз');

    return (
      <li className="StatMinMax-item" key={index}>
        <div className="StatMinMax-itemDate">{dateToDayMonthAccusative(date)}</div>
        <div className="StatMinMax-itemValue">{valueWithPostfix}</div>
      </li>
    );
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: this.state.animatorCurrValues,
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return oldValues.some((oldItem, index) => {
          const oldDate = dateToYYYYMMDD(new Date(oldItem.time));
          const newDate = dateToYYYYMMDD(new Date(newValues[index].time));
          const oldValue = Math.round(oldItem.value);
          const newValue = Math.round(newValues[index].value);

          return oldDate !== newDate || oldValue !== newValue;
        });
      },
      onValueChange: (newValues) => this.setState({animatorCurrValues: newValues}),
    });
  }
}
