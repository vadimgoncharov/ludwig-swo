import * as React from 'react';
import * as classNames from 'classnames';

import Link from 'shared/components/Link';
import newsData from './newsData';

import './News.scss';
import {dateToDMMYYYY} from 'shared/utils/date';

export type TNewsItem = {
  content: string,
  date: Date,
};

export default class News extends React.Component<any, any> {
  public render() {
    return (
      <div className="News">
        <div className="News-title">Новости</div>
        <ol className="News-items">
          {newsData.map(this.renderItem)}
        </ol>
      </div>
    );
  }

  private renderItem = (item: TNewsItem, index: number) => {
    return (
      <li className="News-item" key={index}>
        <span className="News-itemDate">{dateToDMMYYYY(item.date)}</span>{' '}&nbsp;
        {item.content}{' '}&nbsp;{' '}
      </li>
    );
  };
}
