// @flow
import React, {Component} from 'react';

import './StatMonths.scss';

type PrevMonthStat = {|
  title: string,
  value: number,
  color?: string,
  backgroundColor: string,
|};



export default class StatMonthes extends Component {
  renderItem = (statItem: PrevMonthStat, index: number): React$Element<any> => {
    const {title, value, color, backgroundColor} = statItem;
    return (
      <li className="StatMonths-item" key={index}>
        <div className="StatMonths-itemValue" style={{backgroundColor, color}}>{value}</div>
        <div className="StatMonths-itemTitle">{title}</div>
      </li>
    );
  };

  render(): React$Element<any> {
    const stat: PrevMonthStat[] = [
      {title: 'cентября', value: 17, color: 'white', backgroundColor: 'midnightblue'},
      {title: 'августа', value: 21, backgroundColor: 'limegreen'},
      {title: 'мая', value: 28, backgroundColor: 'goldenrod'},
      {title: 'декабря', value: 29, backgroundColor: 'orchid'},
      {title: 'октября', value: 30, backgroundColor: '#808000'},
      {title: 'февраля', value: 28, backgroundColor: 'goldenrod'},
      {title: 'февраля', value: 29, backgroundColor: 'orchid'},
      {title: 'июня', value: 16, backgroundColor: 'blanchedalmond'},
      {title: 'июня', value: 18, backgroundColor: '#800000'},
      {title: 'октября', value: 9, backgroundColor: 'powderblue'},
    ];

    return (
      <div className="StatMonths">
        <div className="StatMonths-title">Предыдущие дни открытия сайта:</div>
        <ul className="StatMonths-items">
          {stat.map(this.renderItem)}
        </ul>
      </div>
    );
  }
}
