import * as React from 'react';
import * as classNames from 'classnames';

import Animator from 'shared/services/Animator';
import {dateToDayMonth, dateToYYYYMMDD} from 'shared/utils/date';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';

import {TStatTotal} from 'shared/types/StatTotal';

import './Header.scss';

type TProps = {
  isFetching: boolean,
  isSwoDateVisible: boolean,
  statTotal: TStatTotal,
  onFetchLinkClick: () => void,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class Header extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      time: 0,
    },
  };
  public props: TProps;
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
    this.animator = this.createAnimator();
    this.animator.enableAnimation();
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
      <div className="Header">
        <div className="Header-nav">
          <div className="Header-navItem is-swo">
            {this.renderSwoDate()}
          </div>
        </div>
      </div>
    );
  }

  private onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
    if (!isFetching) {
      onFetchLinkClick();
    }
  };

  private renderSwoDate() {
    const {isFetching, isSwoDateVisible} = this.props;
    const date: string = dateToDayMonth(new Date(this.state.animatorCurrValue.time));
    const className = classNames(
      'Header-swoDate',
      `is-fetching_${isFetching ? 'yes' : 'no'}`,
      `is-valueVisible_${isSwoDateVisible ? 'yes' : 'no'}`,
    );

    return (
      <div className={className}>
        <span className="Header-swoDateValue">
          <span className="Header-swoDateValueInner">
            <span className="Header-swoDateValueText">Сайт откроется</span>{' '}
            {date}
          </span>
        </span>{' '}
        <span className="Header-swoDateFetchButton" onClick={this.onFetchLinkClick}>Другая дата</span>
      </div>
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
