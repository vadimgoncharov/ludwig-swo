import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as pluralize from 'plural-ru';
import * as TWEEN from 'tween.js';

import {dateToDayMonth} from 'shared/utils/date';

import {TStatMinMax} from 'shared/types/StatMinMax';
import {TStatValueAtDate} from 'shared/types/StatValueAtDate';

import './StatMinMax.scss';

type Props = {
  isFetching: boolean,
  statMinMax: TStatMinMax,
};

type State = {
  isAnimationInProgress?: boolean,
  isInViewport?: boolean,
  deltaItems?: TStatMinMax,
};

const initalDate: Date = new Date();

export default class StatMinMax extends React.Component<Props, State> {
  public state = {
    isAnimationInProgress: false,
    isInViewport: false,
    deltaItems: [
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
      {date: initalDate, value: 0},
    ],
  };

  componentWillReceiveProps(nextProps: Props) {
    const oldStat = this.props.statMinMax;
    const newStat = nextProps.statMinMax;

    if (oldStat === newStat) {
      return;
    }

    this.startAnimation(oldStat, newStat);
  }

  startAnimation(oldStat: TStatMinMax, newStat: TStatMinMax) {
    this.setState({
      isAnimationInProgress: true,
    }, () => {
      oldStat.forEach((oldStatItem: TStatValueAtDate, index: number) => {
        const newStatItem = newStat[index];
        const data = {time: oldStatItem.date.getTime(), value: oldStatItem.value};
        const tween = new TWEEN.Tween(data);
        tween.to({time: newStatItem.date.getTime(), value: newStatItem.value}, this.state.isInViewport ? 3000 : 0);
        tween.onUpdate(() => {
          this.state.deltaItems[index].date = new Date(data.time);
          this.state.deltaItems[index].value = Math.round(data.value);
        });
        tween.easing(TWEEN.Easing.Exponential.Out);
        tween.onComplete(() => {
          this.setState({
            isAnimationInProgress: false,
          });
        });
        tween.start();
      });
      const animate = () => {
        if (!this.state.isAnimationInProgress) {
          return;
        }
        requestAnimationFrame(animate);
        TWEEN.update();
        this.forceUpdate();
      };
      animate();
    });
  }

  onWaypointEnter = () => {
    this.setState({
      isInViewport: true,
    });
  };

  onWaypointLeave = () => {
    this.setState({
      isInViewport: false,
    });
  };

  renderItem = (item: TStatValueAtDate, index: number) => {
    const {date, value} = item;
    const valueWithPostfix: string = pluralize(value, '%d раз', '%d раза', '%d раз');

    return (
      <li className="StatMinMax-item" key={index}>
        <div className="StatMinMax-itemDate">{dateToDayMonth(date)}</div>
        <div className="StatMinMax-itemValue">{valueWithPostfix}</div>
      </li>
    );
  };

  render() {
    const {statMinMax} = this.props;
    const {deltaItems} = this.state;
    const items = deltaItems[0].date !== initalDate ? deltaItems : statMinMax;

    return (
      <Waypoint onEnter={this.onWaypointEnter} onLeave={this.onWaypointLeave}>
        <div className="StatMinMax">
          <div className="StatMinMax-columns">
            <div className="StatMinMax-column is-max">
              <div className="StatMinMax-columnTitle">Сайт откроется чаще всего:</div>
              <ol className="StatMinMax-items">
                {items.slice(0, 4).map(this.renderItem)}
              </ol>
            </div>
            <div className="StatMinMax-column is-middle">
              <div className="StatMinMax-columnTitle">&nbsp;</div>
              <ol className="StatMinMax-items">
                <li className="StatMinMax-item">
                  <div className="StatMinMax-itemDate">...</div>
                  <div className="StatMinMax-itemValue">...</div>
                </li>
              </ol>
            </div>
            <div className="StatMinMax-column is-min">
              <div className="StatMinMax-columnTitle">Сайт откроется реже всего:</div>
              <ol className="StatMinMax-items">
                {items.slice(4).map(this.renderItem)}
              </ol>
            </div>
          </div>
        </div>
      </Waypoint>
    );
  }
}
