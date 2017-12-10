import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';
import SectionContent from 'shared/ui/SectionContent/SectionContent';
import Nav from '../Nav/Nav';
import analytics from 'shared/services/analytics';
import {GOAL_ID_HERO_CHANGE_DATE_CLICK} from 'shared/constants/analytics';
import FaviconRenderer from 'shared/services/FaviconRenderer';
import Animator from 'shared/services/Animator';
import {
  ANIMATION_DURATION_DEFAULT,
  INITIAL_LOADING_ANIMATIONS_DURATION,
  navSections
} from 'shared/constants';
import {dayNumToColor, dayNumToData, dayNumToDayMonthAccusative} from 'shared/utils/date';
import {formatValueToTimesWithPluralize} from 'shared/utils/format';
import navSectionData from './navSectionData';
import Poloter from '../Poloter/Poloter';
import './Hero.scss';

import {TTotal} from 'shared/types/Total';
type TProps = {
  isFetching: boolean,
  total: TTotal,
  onHeaderSwoDateVisibilityChange: (isVisible: boolean) => void,
  onFetchLinkClick: () => void,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
  value: number,
};

export default class Hero extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      dayNum: 0,
      value: 0,
    },
  };
  private changeDateEl: HTMLElement;
  private animator: Animator<TAnimatorValue>;
  private faviconRenderer: FaviconRenderer;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.state.animatorCurrValue.value = props.total.value;
    this.animator = this.createAnimator();
    this.faviconRenderer = new FaviconRenderer();
  }

  public componentDidMount() {
    this.renderFavicon(false);
    this.renderHeadTitle();
    this.changeSwoDateVisibilityIfBelow();
  }

  public componentDidUpdate() {
    this.renderFavicon();
    this.renderHeadTitle();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.total.dayNum;
    const newDate = nextProps.total.dayNum;

    if (oldDate === newDate) {
      return;
    }

    this.animator.start([{dayNum: newDate, value: nextProps.total.value}]);
  }

  public render() {
    const className = classNames(
      'Hero',
      `is-fetching_${this.props.isFetching ? 'yes' : 'no'}`,
    );
    return (
      <section className={className}>
        <SectionContent navSection={navSectionData}>
          {this.renderDayNum()}
          {this.renderDate()}
          {this.renderChangeDate()}
          {this.renderPoloter()}
          {this.renderTotal()}
          {this.renderTotalDescription()}
          {this.renderSumOfNumbers()}
          {this.renderNav()}
        </SectionContent>
      </section>
    );
  }

  private renderDayNum() {
    const currDayNum = this.props.total.dayNum;
    const {day: currDay} = dayNumToData(currDayNum);
    const {bgColor, textColor} = dayNumToColor(currDayNum);
    const style = {
      backgroundColor: bgColor,
      color: textColor,
    };
    return (
      <div className="Hero-day" style={style}>
        {currDay}
      </div>
    );
  }

  private renderDate() {
    const {total} = this.props;
    return (
      <div className="Hero-swo">
        <div className="Hero-swoText">Сайт откроется</div>
        <CSSTransitionGroup
          className="Hero-swoDateContainer"
          component="div"
          transitionName="slide"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          <div
            className="Hero-swoDate"
            key={total.id}
          >
            {dayNumToDayMonthAccusative(total.dayNum)}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }

  private renderChangeDate() {
    return (
      <Waypoint
        onEnter={this.onHeroSwoEnter}
        onLeave={this.onHeroSwoLeave}
        onPositionChange={this.onHeroSwoPositionChange}
      >
        <div className="Hero-changeDate" ref={this.onChangeDateRefSet}>
          Или в <button className="Hero-fetchButton" onClick={this.onFetchLinkClick} tabIndex={0}>другой день</button>
        </div>
      </Waypoint>
    );
  }

  private renderPoloter() {
    const {isFetching} = this.props;
    return (
      <div className="Hero-poloter">
        <Poloter isFetching={isFetching}/>
        <Poloter isFetching={isFetching} isMirrored={true} />
      </div>
    );
  }

  private renderTotal() {
    const value = formatValueToTimesWithPluralize(this.state.animatorCurrValue.value);
    return (
      <div className="Hero-total">
        Всего сайт откроется {value}
      </div>
    )
  }

  private renderTotalDescription() {
    return (
      <div className="Hero-totalDescription">
        Каждый раз сайт сообщает новую случайную дату открытия.<br />
        Все обещания бережно записываются, и на их основе строится статистика.</div>
    );
  }

  private renderSumOfNumbers() {
    const totalValue: number = Math.round(this.state.animatorCurrValue.value);
    return (
      <div className="Hero-sumOfNum">Кстати, {this.getSumOfNumber(totalValue)}.</div>
    );
  }

  private getSumOfNumber(value: number): string {
    const numArr: number[] = value
      .toString()
      .split('')
      .map((val: string) => parseInt(val));

    const sum: number = numArr.reduce((numSum: number, numValue: number) => {
      numSum += numValue;
      return numSum;
    }, 0);

    const numSumStr: string = numArr.join(' + ');

    return `${numSumStr} = ${sum}`;
  }

  private renderNav() {
    return (
      <div className="Hero-nav">
        <Nav navSections={navSections} />
      </div>
    );
  }

  private renderFavicon(useAnimation: boolean = true): void {
    // TODO Move faviconRenderer to separate component
    this.faviconRenderer.render(this.props.total.dayNum, useAnimation);
  }

  private renderHeadTitle() {
    // TODO Move to separate component
    document.title = `Сайт откроется ${dayNumToDayMonthAccusative(this.props.total.dayNum)}`;
  }

  private changeSwoDateVisibilityIfBelow() {
    setTimeout(() => {
      const {changeDateEl} = this;
      if (changeDateEl) {
        const {top} = this.changeDateEl.getBoundingClientRect();
        if (top < 0) {
          this.props.onHeaderSwoDateVisibilityChange(true);
        }
      }
    }, INITIAL_LOADING_ANIMATIONS_DURATION);
  }

  private onChangeDateRefSet = (el: HTMLElement) => {
    this.changeDateEl = el;
  };

  private onHeroSwoEnter = (): void => {
    this.props.onHeaderSwoDateVisibilityChange(false);
  };

  private onHeroSwoLeave = (): void => {
    this.props.onHeaderSwoDateVisibilityChange(true);
  };

  private onHeroSwoPositionChange = (data): void => {
     if (data.currentPosition === 'below') {
       this.props.onHeaderSwoDateVisibilityChange(true);
     }
  };

  private onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
    analytics.reachYaGoal(GOAL_ID_HERO_CHANGE_DATE_CLICK);
    if (!isFetching) {
      onFetchLinkClick();
    }
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{
        dayNum: this.state.animatorCurrValue.dayNum,
        value: this.state.animatorCurrValue.value,
      }],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => oldValues[0].dayNum !== newValues[0].dayNum,
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
