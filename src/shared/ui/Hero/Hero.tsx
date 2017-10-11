import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';
import SectionContent from 'shared/ui/SectionContent/SectionContent';
import Nav from '../Nav/Nav';
import FaviconRenderer from 'shared/services/FaviconRenderer';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT, navSections} from 'shared/constants';
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
  }

  public componentDidUpdate() {
    this.renderFavicon();
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
        <div className="Hero-changeDate">
          Или в <span className="Hero-fetchButton" onClick={this.onFetchLinkClick}>другой день</span>
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

  private onHeroSwoEnter = (): void => {
    this.props.onHeaderSwoDateVisibilityChange(false);
  };

  private onHeroSwoLeave = (): void => {
    this.props.onHeaderSwoDateVisibilityChange(true);
  };

  private onHeroSwoPositionChange = (data): void => {
     if (data.currentPosition !== 'inside') {
       this.props.onHeaderSwoDateVisibilityChange(true);
     }
  };

  private onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
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