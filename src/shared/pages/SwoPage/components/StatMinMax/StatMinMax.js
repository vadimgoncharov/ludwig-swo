// @flow
import React, {Component} from 'react';
import pluralize from 'plural-ru';

import './StatMinMax.scss';

type StatMinMaxItem = {|
  date: string,
  value: number,
|};

export default class StatMinMax extends Component {
  renderItem = (item: StatMinMaxItem, index: number): React$Element<any> => {
    const {date, value} = item;
    const valueWithPostfix: string = pluralize(value, '%d раз', '%d раза', '%d раз');

    return (
      <li className="StatMinMax-item" key={index}>
        <div className="StatMinMax-itemDate">{date}</div>
        <div className="StatMinMax-itemValue">{valueWithPostfix}</div>
      </li>
    );
  };

  render(): React$Element<any> {
    const maxItems: StatMinMaxItem[] = [
      {date: '18 октября', value: 8327},
      {date: '15 марта', value: 8304},
      {date: '13 февраля', value: 8302},
      {date: '14 мая', value: 8300},
    ];

    const minItems: StatMinMaxItem[] = [
      {date: '25 мая', value: 7854},
      {date: '29 декабря', value: 7852},
      {date: '7 ноября', value: 7827},
      {date: '6 декабря', value: 7825},
    ];

    return (
      <div className="StatMinMax">
        <div className="StatMinMax-columns">
          <div className="StatMinMax-column is-max">
            <div className="StatMinMax-columnTitle">Сайт откроется чаще всего:</div>
            <ol className="StatMinMax-items">
              {maxItems.map(this.renderItem)}
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
              {minItems.map(this.renderItem)}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
