// @flow
import React, {Component} from 'react';
import classNames from 'classnames';

import './StatJdan.scss';

type StatJdanDate = {|
  date: string,
  halValue: number,
  chValue: number,
|};

type ToggleSelectedKey = 'hal' | 'ch';
type State = {
  togglerSelectedKey: ToggleSelectedKey,
};

export default class StatJdan extends Component<any, any, State> {
  state: State;
  state = {
    togglerSelectedKey: 'hal',
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

  renderItem = (item: StatJdanDate, index: number): React$Element<any> => {
    const {togglerSelectedKey} = this.state;
    const {date, halValue, chValue} = item;

    const imgBodyHeight = togglerSelectedKey === 'hal' ? halValue : chValue;
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
       <div className="StatJdan-itemDate">{date}</div>
      </li>
    );
  };

  render(): React$Element<any> {
    const dates: StatJdanDate[] = [
      {
        date: '6 декабря',
        halValue: 7825,
        chValue: 122,
      },
      {
        date: '18 октября',
        halValue: 8327,
        chValue: 130,
      },
      {
        date: '5 января',
        halValue: 7872,
        chValue: 122,
      },
      {
        date: '25 февраля',
        halValue: 8298,
        chValue: 129,
      },
      {
        date: '29 декабря',
        halValue: 7854,
        chValue: 122,
      },
    ];

    const {togglerSelectedKey} = this.state;
    const togglerHalClassName = classNames('StatJdan-toggler is-hal', {
      'is-selected': togglerSelectedKey === 'hal',
    });
    const togglerChClassName = classNames('StatJdan-toggler is-ch', {
      'is-selected': togglerSelectedKey === 'ch',
    });

    return (
      <div className="StatJdan">
        <div className="StatJdan-title">
          Если бы рост
          Ждана Филиппова <span className={togglerHalClassName} onClick={this.onTogglerHalClick}>галлюцинировал</span> либо <span className={togglerChClassName} onClick={this.onTogglerChClick}>менялся</span> в&nbsp;зависимости
          от&nbsp;количества открытий сайта, то&nbsp;в&nbsp;разные дни Ждан выглядел бы вот так:
        </div>
        <ol className="StatJdan-items">
          {dates.map(this.renderItem)}
        </ol>
      </div>
    );
  }
}
