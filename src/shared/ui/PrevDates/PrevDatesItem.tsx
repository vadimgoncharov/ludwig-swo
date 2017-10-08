import * as React from 'react';
import {
  dayNumToColor,
  dayNumToData,
  dayNumToMonthAccusative,
} from 'shared/utils/date';

type TProps = {
  dayNum: number,
  index: number,
  offsetX: number,
  prevOffsetX: number,
  nextOffsetX: number,
  offsetY: number,
  getItemPosition: (index) => {x: number, y: number},
};

const getTransformStyle = (x: number, y: number, scale: number): string => {
  return `translate3d(${x}px, ${y}px, 0) scale(${scale}, ${scale})`;
};

export default class PrevDatesItem extends React.Component<TProps, any> {
  public props: TProps;
  private rootContainer: HTMLElement;

  public componentWillEnter(done: () => {}) {
    this.rootContainer.style.transform = getTransformStyle(this.props.getItemPosition(-1).x, this.props.offsetY, 0);
    this.rootContainer.style.opacity = '0';
    setTimeout(() => {
      done();
    })

  }
  public componentDidEnter(done: () => {}) {
    this.rootContainer.style.transform = getTransformStyle(this.props.offsetX, this.props.offsetY, 1);
    this.rootContainer.style.opacity = '1';
    // this.c.style = '0';
  }

  public componentWillLeave(done: () => {}) {
    // this.c.style.left = `${this.props.index*100 + 100}px`;
    const {x, y} = this.props.getItemPosition(this.props.index + 1);
    this.rootContainer.style.transform = getTransformStyle(x, y, 0);
    this.rootContainer.style.opacity = '0';
    setTimeout(() => {
      done();
    }, 300)
  }

  public render() {
    const {dayNum, offsetX, offsetY} = this.props;
    const {day} = dayNumToData(dayNum);
    const styleItem = {
      transform: getTransformStyle(offsetX, offsetY, 1),
    };
    const {bgColor, textColor} = dayNumToColor(dayNum);
    const styleItemValue = {
      backgroundColor: bgColor,
      color: textColor,
    };
    return (
      <li className="PrevDates-item" ref={this.onRootContainerRefSet} style={styleItem}>
        <div className="PrevDates-itemValue" style={styleItemValue}>{day}</div>
        <div className="PrevDates-itemTitle">{dayNumToMonthAccusative(dayNum)}</div>
      </li>
    );
  };

  private onRootContainerRefSet = (el) => {
    this.rootContainer = this.rootContainer || el;
  };

}
