import * as React from 'react';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';

import {dateToDayMonth} from 'shared/utils/date';

import './StatJdan.scss';
import {TStatJdan} from 'shared/types/StatJdan';
import {TStatJdanValueAtDate} from 'shared/types/StatJdanValueAtDate';

enum TToggleSelectedKey {
  hal,
  ch,
}

type TProps = {
  isFetching: boolean,
  statJdan: TStatJdan,
};

type TState = {
  togglerSelectedKey: TToggleSelectedKey,
};

export default class StatJdan extends React.Component<TProps, TState> {
  public state = {
    togglerSelectedKey: TToggleSelectedKey.hal,
  };

  public render() {
    const {statJdan} = this.props;
    const items = statJdan;
    const {togglerSelectedKey} = this.state;
    const togglerHalClassName = classNames('StatJdan-toggler is-hal', {
      'is-selected': togglerSelectedKey === TToggleSelectedKey.hal,
    });
    const togglerChClassName = classNames('StatJdan-toggler is-ch', {
      'is-selected': togglerSelectedKey === TToggleSelectedKey.ch,
    });

    return (
      <Waypoint>
        <div className="StatJdan">
          <div className="StatJdan-title">
            Если бы рост
            Ждана Филиппова{' '}
            <span className={togglerHalClassName} onClick={this.onTogglerHalClick}>галлюцинировал</span>{' '}
            либо <span className={togglerChClassName} onClick={this.onTogglerChClick}>менялся</span>{' '}
            в&nbsp;зависимости от&nbsp;количества открытий сайта,{' '}
            то&nbsp;в&nbsp;разные дни Ждан выглядел бы вот так:
          </div>
          <ol className="StatJdan-items">
            {items.map(this.renderItem)}
          </ol>
        </div>
      </Waypoint>
    );
  }

  private onTogglerHalClick = (): void => {
    this.setState({
      togglerSelectedKey: TToggleSelectedKey.hal,
    });
  };

  private onTogglerChClick = (): void => {
    this.setState({
      togglerSelectedKey: TToggleSelectedKey.ch,
    });
  };

  private renderItem = (item: TStatJdanValueAtDate, index: number) => {
    const {togglerSelectedKey} = this.state;
    const {date, value, chValue} = item;

    const imgBodyHeight = togglerSelectedKey === TToggleSelectedKey.hal ? value : chValue;
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
}
