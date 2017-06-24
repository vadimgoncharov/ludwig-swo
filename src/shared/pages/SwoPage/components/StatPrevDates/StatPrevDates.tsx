import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import * as TransitionGroup from 'react-transition-group/TransitionGroup';
import * as onresize from 'onresize';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dateToMonthStr, dateToYYYYMMDD} from 'shared/utils/date';

import StatPrevDatesItem from './StatPrevDatesItem';

import {TStatPrevDates} from 'shared/types/StatPrevDates';

import './StatPrevDates.scss';

type TProps = {
  isFetching: boolean,
  statPrevDates: TStatPrevDates,
};

type TState = {
  animatorCurrValues: TAnimatorValue[],
  itemsLayout: Array<{
    offsetX: number,
    offsetY: number,
  }>,
  itemsLayoutWidth: number,
  itemsLayoutHeight: number,
};

type TAnimatorValue = {
  time: number,
};

const ITEM_WIDTH = 100;
const ITEM_HEIGHT = 120;
const ITEMS_MAX_COUNT = 10;

export default class StatPrevDates extends React.Component<TProps, TState> {
  public state = {
    animatorCurrValues: [],
    itemsLayout: [],
    itemsLayoutWidth: 0,
    itemsLayoutHeight: 0,
  };
  private animator: Animator<TAnimatorValue>;
  private containerInner: HTMLElement;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValues = props.statPrevDates.map((item): TAnimatorValue => {
      return {
        time: item.date.getTime(),
      };
    });
    this.state.itemsLayout = this.getRecalculatedItemsLayout().layout;

    this.animator = this.createAnimator();
  }

  public componentDidMount() {
    this.recalculateItemsLayout();
    onresize.on(this.onResize);
  }

  public componentWillUnmount() {
    onresize.off(this.onResize);
  }

  private onResize = () => {
    this.recalculateItemsLayout();
  };

  private getItemPosition(index: number) {
    if (index < 0) {
      return {
        x: -ITEM_WIDTH,
        y: 0,
      }
    }
    const containerWidth = this.containerInner && this.containerInner.offsetWidth;
    const COLUMNS_COUNT = Math.floor(containerWidth / ITEM_WIDTH);
    const COLUMNS_WIDTH = ITEM_WIDTH * COLUMNS_COUNT;

    let x = (index * ITEM_WIDTH) % COLUMNS_WIDTH;
    let y = Math.floor((index * ITEM_WIDTH) / COLUMNS_WIDTH) * ITEM_HEIGHT;

    if (index > ITEMS_MAX_COUNT - 1) {
      const {x: lastX, y: lastY} = this.getItemPosition(ITEMS_MAX_COUNT - 1);
      if (y !== lastY) {
        y = lastY;
        x = lastX + ITEM_WIDTH;
      }
    }
    return {
      x,
      y,
    };
  }
  private getRecalculatedItemsLayout() {
    const items = [];
    let maxX = ITEM_WIDTH;
    let maxY = ITEM_HEIGHT;
    for (let i = 0; i < ITEMS_MAX_COUNT; i++) {
      const {x, y} = this.getItemPosition(i);
      maxX = Math.max(maxX, x + ITEM_WIDTH);
      maxY = Math.max(maxY, y + ITEM_HEIGHT);
      items.push({
        offsetX: x,
        offsetY: y,
      });
    }
    return {
      layout: items,
      totalWidth: maxX,
      totalHeight: maxY,
    };
  }

  private recalculateItemsLayout() {
    const {layout, totalWidth, totalHeight} = this.getRecalculatedItemsLayout();
    this.setState({
      itemsLayout: layout,
      itemsLayoutWidth: totalWidth,
      itemsLayoutHeight: totalHeight,
    });
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDates = this.props.statPrevDates;
    const newDates = nextProps.statPrevDates;

    if (oldDates === newDates) {
      return;
    }

    this.animator.stop();
    setTimeout(() => {
      this.animator.start(newDates.map((item): TAnimatorValue => {
        return {
          time: item.date.getTime(),
        };
      }));
    });
  }

  public render() {
    const stat = this.props.statPrevDates;
    const {itemsLayout, itemsLayoutWidth, itemsLayoutHeight} = this.state;
    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
        <div className="StatPrevDates">
          <div className="StatPrevDates-containerInner" ref={(c) => this.containerInner = this.containerInner || c}>
            <div className="StatPrevDates-title">Предыдущие дни открытия сайта:</div>
            <TransitionGroup
              component="ul"
              className="StatPrevDates-items"
              style={{
                width: `${itemsLayoutWidth}px`,
                minHeight: `${itemsLayoutHeight}px`,
              }}
            >
              {stat.map((item, itemIndex) => {
                const {offsetX, offsetY} = itemsLayout[itemIndex]
                return (
                  <StatPrevDatesItem
                    date={item.date}
                    key={item.id}
                    index={itemIndex}
                    offsetX={offsetX}
                    offsetY={offsetY}
                    prevOffsetX={offsetX - ITEM_WIDTH}
                    nextOffsetX={offsetX + ITEM_WIDTH}
                    getItemPosition={(index) => this.getItemPosition(index)}
                  />
                );
              })}
            </TransitionGroup>
          </div>
        </div>
      </Waypoint>
    );
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: this.state.animatorCurrValues,
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return oldValues.some((oldItem, index) => {
          const oldDate = dateToYYYYMMDD(new Date(oldItem.time));
          const newDate = dateToYYYYMMDD(new Date(newValues[index].time));

          return oldDate !== newDate;
        });
      },
      onValueChange: (newValue) => this.setState({animatorCurrValues: newValue}),
      onStateChange: (animationState) => this.forceUpdate(),
    });
  }
}
