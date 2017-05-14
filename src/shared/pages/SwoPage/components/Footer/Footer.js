// @flow
import React, {Component} from 'react';

import Link from 'shared/components/Link';

import './Footer.scss';

type AuthorItem = {|
  name: string,
  date: number,
|};

export default class Footer extends Component {
  renderAuthors(): React$Element<any> {
    const authors: AuthorItem[] = [
      {
        name: 'Сергей Муратов',
        date: 2006,
      },
      {
        name: 'Андрей Шитов',
        date: 2007,
      },
      {
        name: 'Алексей Анисимов',
        date: 2015,
      },
    ];
    return (
      <div className="Footer-authors">
        <div className="Footer-authorsOwner">Сайт откроется Людвигом Быстроновским.</div>
        <div className="Footer-authorsDevs">
          <span className="Footer-authorsDevsTitle">Над сайтооткрыванием работали</span>
          <ol className="Footer-authorsDevsItems">
            {authors.map((item: AuthorItem, index: number): React$Element<any> => {
              const {name, date} = item;
              return (
                <li className="Footer-authorsDevsItem" key={index}>
                  <span className="Footer-authorsDevsItemName">{name}</span>
                  <span className="Footer-authorsDevsItemDate">{date}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }

  renderContacts(): React$Element<any> {
    return (
      <div className="Footer-contacts">
        Эл. почта: <Link href="mailto:ludwig@ludwigbistronovsky.ru">ludwig@ludwigbistronovsky.ru</Link>
      </div>
    );
  }

  render(): React$Element<any> {
    return (
      <div className="Footer">
        {this.renderAuthors()}
        {this.renderContacts()}
      </div>
    );
  }
}
