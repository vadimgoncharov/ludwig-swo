import * as React from 'react';
import * as classNames from 'classnames';
import {dateToMonthStr} from 'shared/utils/date';

type TProps = {
  date: Date,
  index: number,
  offsetX: number,
  prevOffsetX: number,
  nextOffsetX: number,
  offsetY: number,
  getItemPosition: (index) => {x: number, y: number},
};

const getTransformStyle = (x: number, y: number, scale: number): string => {
  return `translate3d(${x}px, ${y}px, 0) scale(${scale}, ${scale})`;
}

export default class StatPrevDatesItem extends React.Component<TProps, any> {
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
    const {date, index, offsetX, offsetY} = this.props;
    const bgColorNum = date.getMonth() + 1;
    const itemValueClassName = classNames('StatPrevDates-itemValue', `is-bgColor${bgColorNum}`);
    const style = {
      transform: getTransformStyle(offsetX, offsetY, 1),
    };
    return (
      <li className="StatPrevDates-item" ref={(c) => {this.rootContainer = this.rootContainer || c}} style={style}>
        <div className={itemValueClassName}>{date.getDate()}</div>
        <div className="StatPrevDates-itemTitle">{dateToMonthStr(date)}</div>
      </li>
    );
  };
}
