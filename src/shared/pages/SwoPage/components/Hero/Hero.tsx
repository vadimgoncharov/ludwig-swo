import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import {CSSTransitionGroup} from 'react-transition-group';
import * as classNames from 'classnames';

import FaviconRenderer from 'shared/services/FaviconRenderer';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import * as utils from 'shared/utils';

import {TStatTotal} from 'shared/types/StatTotal';

import './Hero.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
  onHeaderSwoDateVisibilityChange: (isVisible: boolean) => void,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

export default class Hero extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      time: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;
  private faviconRenderer: FaviconRenderer;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
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
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    // this.animator.start([{time: newDate.getTime()}]);
  }

  public render() {
    const date: string = utils.date.dateToDayMonthAccusative(new Date(this.state.animatorCurrValue.time));

    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="Hero">
          {this.renderDayNum()}
          {this.renderDate()}
          {this.renderGuy()}
          {this.renderTotal()}
        </div>
      </Waypoint>
    );
  }

  private renderDayNum() {
    const currDate = this.props.statTotal.date;
    const bgColorNum = currDate.getMonth() + 1;
    const className = classNames('Hero-day', `is-bgColor${bgColorNum}`);
    return (
      <div className={className}>
        {currDate.getDate()}
      </div>
    );
  }

  private renderDate() {
    return (
      <div className="Hero-swo">
        <Waypoint
          onEnter={this.onHeroSwoEnter}
          onLeave={this.onHeroSwoLeave}
          onPositionChange={this.onHeroSwoPositionChange}
        >
          <div className="Hero-swoText">Сайт откроется</div>
        </Waypoint>
        <CSSTransitionGroup
          className="Hero-swoDateContainer"
          component="div"
          transitionName="slide"
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          <div
            className="Hero-swoDate"
            key={this.props.statTotal.id}
          >
            {utils.date.dateToDayMonthAccusative(this.props.statTotal.date)}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }

  private renderGuy() {
    return (
      <div className="Hero-guy" />
    );
  }

  private renderTotal() {
    const value = utils.format.formatValueToTimesWithPluralize(this.props.statTotal.value);
    return (
      <div className="Hero-total">
        Всего сайт откроется {value}
      </div>
    )
  }

  private renderFavicon(useAnimation: boolean = true): void {
    // TODO Move faviconRenderer to separate component
    // this.faviconRenderer.render(new Date(this.state.animatorCurrValue.time).getDate());
    this.faviconRenderer.render(this.props.statTotal.date, useAnimation);
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
