// @flow
import React, {Component} from 'react';
import Waypoint from 'react-waypoint';
import classNames from 'classnames';
import TWEEN from 'tween.js';

import {dateToDayMonth} from 'shared/utils/date';
import type {StatJdan as StatJdanType, StatValueDateJdan} from 'shared/reducers/stats';


import './StatJdan.scss';

type StatJdanDate = {|
  date: string,
  halValue: number,
  chValue: number,
|};

type ToggleSelectedKey = 'hal' | 'ch';

type Props = {|
  isFetching: boolean,
  statJdan: StatJdanType,
|};

type State = {|
  isAnimationInProgress: boolean,
  isInViewport: boolean,
  togglerSelectedKey: ToggleSelectedKey,
|};

export default class StatJdan extends Component<void, Props, State> {
  props: Props;
  state: State;
  state = {
    isAnimationInProgress: false,
    isInViewport: false,
    togglerSelectedKey: 'hal',
  };

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

  onTogglerHalClick = (): void => {
    this.setState({
      togglerSelectedKey: 'hal',
    });
  };

  onTogglerChClick = (): void => {
    this.setState({
      togglerSelectedKey: 'ch',
    });
  };

  renderItem = (item: StatValueDateJdan, index: number): React$Element<any> => {
    const {togglerSelectedKey} = this.state;
    const {date, value, chValue} = item;

    const imgBodyHeight = togglerSelectedKey === 'hal' ? value : chValue;
    const imgBodyStyle = {
      height: imgBodyHeight + 'px',
    };

    return (
      <li className="StatJdan-item" key={index}>
        <div className="StatJdan-itemImgContainer">
          <div className="StatJdan-itemImg is-head" />
          <div className="StatJdan-itemImg is-body" style={imgBodyStyle} />
          <div className="StatJdan-itemImg is-legs" />
        </div>
       <div className="StatJdan-itemDate">{dateToDayMonth(date)}</div>
      </li>
    );
  };

  render(): React$Element<any> {
    const {statJdan} = this.props;
    const items = statJdan;
    const {togglerSelectedKey} = this.state;
    const togglerHalClassName = classNames('StatJdan-toggler is-hal', {
      'is-selected': togglerSelectedKey === 'hal',
    });
    const togglerChClassName = classNames('StatJdan-toggler is-ch', {
      'is-selected': togglerSelectedKey === 'ch',
    });

    return (
      <Waypoint onEnter={this.onWaypointEnter} onLeave={this.onWaypointLeave}>
        <div className="StatJdan">
          <div className="StatJdan-title">
            Если бы рост
            Ждана Филиппова <span className={togglerHalClassName} onClick={this.onTogglerHalClick}>галлюцинировал</span> либо <span className={togglerChClassName} onClick={this.onTogglerChClick}>менялся</span> в&nbsp;зависимости
            от&nbsp;количества открытий сайта, то&nbsp;в&nbsp;разные дни Ждан выглядел бы вот так:
          </div>
          <ol className="StatJdan-items">
            {items.map(this.renderItem)}
          </ol>
        </div>
      </Waypoint>
    );
  }
}
