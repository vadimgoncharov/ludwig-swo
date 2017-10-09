import * as React from 'react';
import * as classNames from 'classnames';
import * as onresize from 'onresize';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import {formatValueToTimesWithPluralize} from 'shared/utils/format';
import {angleToRad, convertRange} from 'shared/utils/math';
import navSectionData from './navSectionData';
import './Target.scss';

import {TDayInYear} from 'shared/types/DayInYear';
import {TTotal} from 'shared/types/Total';
import {TMinMax} from 'shared/types/MinMax';
type TProps = {
  dayInYear: TDayInYear,
  total: TTotal,
  minMax: TMinMax,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
  targetSize: number,
};
type TAnimatorValue = {
  dayNum: number,
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
      dayNum: 0,
    },
    targetSize: TARGET_SIZE_MAX,
  };
  private animator: Animator<TAnimatorValue>;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.state.targetSize = TARGET_SIZE_MAX;

    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.total.dayNum;
    const newDate = nextProps.total.dayNum;

    if (oldDate === newDate) {
      return;
    }

    this.animator.start([{dayNum: newDate}]);
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
      <section className={className}>
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="Target-titleContainer">
            <div className="Target-title">{navSectionData.title}</div>
            <div className="Target-subTitle">Распределение дней года по круговой мишени</div>
          </div>
          <div className="Target-container" style={sizes.container}>
            {this.renderItems(sizes)}
          </div>
        </SectionContent>
      </section>
    );
  }

  private renderItems(sizes: TElementSizes) {
    const {dayInYear} = this.props;
    const {min, max} = this.getMinMax();
    const currDayNum = Math.round(this.state.animatorCurrValue.dayNum);

    return (
      <div className="Target-items" style={sizes.items}>
        {dayInYear.map((item, index) => {
          const {value, dayNum} = item;

          const radius = convertRange(value, min, max, sizes.targetSizeHalfWithSafeSpacing, 0);
          const angleInRad = angleToRad(dayNum);
          const x = radius * Math.sin(angleInRad);
          const y = radius * Math.cos(angleInRad);

          const style = {left: `${x}px`, top: `${y}px`};

          const isCurrDayNum = dayNum === currDayNum;
          const showItemContent: boolean = value === min || value === max || isCurrDayNum;
          let content;

          if (showItemContent) {
            content = (
              <div className="Target-itemContent">
                 <span className="Target-itemContentDate">
                   {dayNumToDayMonthAccusative(dayNum)}:
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
            'is-selected': item.dayNum === currDayNum,
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
    const {minMax} = this.props;
    return {
      min: minMax[minMax.length - 1].value,
      max: minMax[0].value,
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
      from: [{dayNum: this.state.animatorCurrValue.dayNum}],
      duration: ANIMATION_DURATION_DEFAULT,
      comparator: (oldValues, newValues) => oldValues[0].dayNum !== newValues[0].dayNum,
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
