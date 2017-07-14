import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import * as onresize from 'onresize';

import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import * as date from 'shared/utils/date';

import {angleToRad, convertRange} from 'shared/utils/math';

import {TStatDayInYear} from 'shared/types/StatDayInYear';
import {TStatTotal} from 'shared/types/StatTotal';
import {TStatMinMax} from 'shared/types/StatMinMax';

import './Target.scss';
import {formatValueToTimesWithPluralize} from 'shared/utils/format';

type TProps = {
  isFetching: boolean,
  statDayInYear: TStatDayInYear,
  statTotal: TStatTotal,
  statMinMax: TStatMinMax,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
  targetSize: number,
};

type TAnimatorValue = {
  time: number,
};

type TElementSizes = {
  container: {width: string, height: string},
  items: {left: string, top: string},
  targetSize: number,
  targetSizeHalfWithSafeSpacing: number,
};

const TARGET_SIZE_MAX = 439;
const TARGET_SIZE_MAX_WINDOW_WIDTH = 530;

export default class Target extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      time: 0,
    },
    targetSize: TARGET_SIZE_MAX,
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
    this.state.targetSize = TARGET_SIZE_MAX;

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.animator.start([{time: newDate.getTime()}]);
  }

  public componentDidMount() {
    this.recalculateTargetSize();
    onresize.on(this.onResize);
  }

  public componentWillUnmount() {
    onresize.off(this.onResize);
  }

  public render() {
    const sizes = this.getElementsSizes();
    const className = classNames('Target', {
      'is-lessThenMaxSize': sizes.targetSize < TARGET_SIZE_MAX,
    });
    return (
      <Waypoint onEnter={this.animator.enableAnimation} onLeave={this.animator.disableAnimation}>
       <div className={className}>
         <div className="Target-titleContainer">
           <div className="Target-title">Целевая аудитория</div>
           <div className="Target-subTitle">Распределение дней года по круговой мишени</div>
         </div>
         <div className="Target-container" style={sizes.container}>
           {this.renderItems(sizes)}
         </div>
       </div>
      </Waypoint>
    );
  }

  private renderItems(sizes: TElementSizes) {
    const {statDayInYear} = this.props;
    const {min, max} = this.getMinMax();
    const currDayNumber = date.getDayNumberInYearByDate(new Date(this.state.animatorCurrValue.time));

    return (
      <div className="Target-items" style={sizes.items}>
        {statDayInYear.map((item, index) => {
          const {value, dayNum} = item;

          const radius = convertRange(value, min, max, sizes.targetSizeHalfWithSafeSpacing, 0);
          const angleInRad = angleToRad(dayNum);
          const x = radius * Math.sin(angleInRad);
          const y = radius * Math.cos(angleInRad);

          const style = {left: `${x}px`, top: `${y}px`};

          const isCurrDayNum = dayNum === currDayNumber;
          const showItemContent: boolean = value === min || value === max || isCurrDayNum;
          let content;

          if (showItemContent) {
            content = (
              <div className="Target-itemContent">
                 <span className="Target-itemContentDate">
                   {date.dateToDayMonthAccusative(date.getDateByDayNumberInYear(dayNum))}:
                 </span>{' '}
                <span className="Target-itemContentValue">
                  {formatValueToTimesWithPluralize(value)}
                 </span>
              </div>
            );
          }

          const itemClassName = classNames('Target-item', {
            'is-showContent': showItemContent,
            'is-min': item.value === min,
            'is-max': item.value === max,
            'is-selected': item.dayNum === currDayNumber,
          });

          return (
            <div className={itemClassName} key={index} style={style} title={`${item.dayNum}. ${item.value}`}>
              {content}
            </div>
          );
        })}
      </div>
    );
  }

  private getElementsSizes(): TElementSizes {
    const {targetSize} = this.state;
    const targetSizeHalf = targetSize / 2;
    return {
      container: {
        width: `${targetSize}px`,
        height: `${targetSize}px`,
      },
      items: {
        left: `${targetSizeHalf}px`,
        top: `${targetSizeHalf}px`,
      },
      targetSize,
      targetSizeHalfWithSafeSpacing: targetSizeHalf - 30,
    };
  }

  private getMinMax(): {min: number, max: number} {
    const {statMinMax} = this.props;
    return {
      min: statMinMax[statMinMax.length - 1].value,
      max: statMinMax[0].value,
    };
  }

  private onResize = () => {
    this.recalculateTargetSize();
  };

  private getRecalculatedTargetSize() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= TARGET_SIZE_MAX_WINDOW_WIDTH) {
      return TARGET_SIZE_MAX;
    }

    return Math.round(TARGET_SIZE_MAX * windowWidth / TARGET_SIZE_MAX_WINDOW_WIDTH);
  }

  private recalculateTargetSize() {
    this.setState({
      targetSize: this.getRecalculatedTargetSize(),
    });
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => {
        return (date.dateToYYYYMMDD(new Date(oldValues[0].time)) !== date.dateToYYYYMMDD(new Date(newValues[0].time)));
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
