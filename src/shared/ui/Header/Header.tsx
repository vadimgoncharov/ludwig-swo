import * as React from 'react';
import * as classNames from 'classnames';
import * as TWEEN from '@tweenjs/tween.js';
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
  dateAnimateString: string,
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
    dateAnimateString: '',
  };
  public props: TProps;
  private animator: Animator<TAnimatorValue>;
  private tween: typeof TWEEN.Tween.prototype;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.state.dateAnimateString = dayNumToDayMonthAccusative(props.total.dayNum);
    // this.animator = this.createAnimator();
    // this.animator.enableAnimation();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldDayNum === newDayNum) {
      return;
    }

    const arr = this.createDateStringArr(oldDayNum, newDayNum);
    const obj = {index: 0};
    let isRunning = false;
    const tween = new TWEEN.Tween(obj);
    tween.onUpdate(() => {
      this.setState({
        dateAnimateString: arr[Math.round(obj.index)],
      });
    });
    tween.onComplete(() => {
      isRunning = false;
    });
    tween.to({index: arr.length - 1}, 1000);
    isRunning = true;
    tween.start();
    const update = (time) => {
      if (isRunning) {
        requestAnimationFrame(update);
        tween.update(time);
      }
    };
    requestAnimationFrame(update);
  }

  private createDateStringArr(oldDayNum: number, newDayNum: number) {
    const prevDate = dayNumToDayMonthAccusative(oldDayNum);
    const nextDate = dayNumToDayMonthAccusative(newDayNum);
    const arr = [];
    for (let i = 0, len = prevDate.length; i < len; i++) {
      const word = prevDate.slice(0, len - i);
      arr.push(word);
    }
    arr.push('');
    arr.push('');
    for (let i = 0, len = nextDate.length; i < len; i++) {
      const word = nextDate.slice(0, i + 1);
      arr.push(word);
    }
    return arr;
  }

  public render() {
    const {isSwoDateVisible} = this.props;
    const className = classNames('Header', `is-swoDateVisible_${isSwoDateVisible ? 'yes' : 'no'}`);
    return (
      <section className={className} id={HEADER_ELEMENT_ID}>
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
    const {isFetching, total} = this.props;
    const className = classNames(
      'Header-swo',
      `is-fetching_${isFetching ? 'yes' : 'no'}`,
    );

    return (
      <div className={className}>
        <span>
          Сайт откроется {this.renderDate()}
        </span>
        {' '}или в
        {' '}<span onClick={this.onFetchLinkClick} className="Header-swoFetchButton">другой день</span>
      </div>
    );
  }

  private renderDate() {
    return (
      <span className="Header-swoDate">{this.state.dateAnimateString}</span>
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
