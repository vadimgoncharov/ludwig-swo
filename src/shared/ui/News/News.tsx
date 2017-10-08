import * as React from 'react';

import SectionContent from 'shared/ui/SectionContent/SectionContent';
import navSectionData from './navSectionData';
import newsData from './newsData';
import {dateToDMMYYYY} from 'shared/utils/date';
import './News.scss';

export type TNewsItem = {
  content: string,
  date: Date,
};

export default class News extends React.Component<any, any> {
  public render() {
    return (
      <section className="News">
        <SectionContent navSection={navSectionData}>
          <div className="News-title">{navSectionData.title}</div>
          <ol className="News-items">
            {newsData.map(this.renderItem)}
          </ol>
        </SectionContent>
      </section>
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
