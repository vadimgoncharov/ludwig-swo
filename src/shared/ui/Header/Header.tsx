import * as React from 'react';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';
import NavIndicator from 'shared/ui/NavIndicator/NavIndicator';
import Animator from 'shared/services/Animator';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {navSections} from 'shared/constants';
import './Header.scss';

import {TTotal} from 'shared/types/Total';
type TProps = {
  isFetching: boolean,
  isSwoDateVisible: boolean,
  selectedNavHashes: {[key: string]: boolean},
  total: TTotal,
  onFetchLinkClick: () => void,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
};

export const HEADER_ELEMENT_ID = 'header';

export default class Header extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValue: {
      dayNum: 0,
    },
  };
  public props: TProps;
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.animator = this.createAnimator();
    this.animator.enableAnimation();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldDayNum === newDayNum) {
      return;
    }
  }

  public render() {
    return (
      <section className="Header" id={HEADER_ELEMENT_ID}>
        <div className="Header-nav">
          <div className="Header-navItem is-swo">
            {this.renderSwoDate()}
          </div>
        </div>
        <div className="Header-navIndicator">
          <NavIndicator navSections={navSections} selectedNavHashes={this.props.selectedNavHashes} />
        </div>
      </section>
    );
  }

  private onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
    if (!isFetching) {
      onFetchLinkClick();
    }
  };

  private renderSwoDate() {
    const {isFetching, isSwoDateVisible, total} = this.props;
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
            <CSSTransitionGroup
              className="Header-swoDateValueContainer"
              transitionName="slide"
              transitionEnterTimeout={600}
              transitionLeaveTimeout={600}
            >
              <span
                className="Header-swoDateValueContainerValue"
                key={total.id}
              >{dayNumToDayMonthAccusative(total.dayNum)}
              </span>
            </CSSTransitionGroup>
          </span>
        </span>{' '}
        <span className="Header-swoDateFetchButton" onClick={this.onFetchLinkClick}>Другая дата</span>
      </div>
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
