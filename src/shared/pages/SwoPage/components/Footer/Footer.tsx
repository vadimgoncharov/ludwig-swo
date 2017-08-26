import * as React from 'react';
import * as classNames from 'classnames';

import Link from 'shared/components/Link';

import './Footer.scss';
import {getRandomInt} from 'shared/utils/random';

type TAuthor = {
  name: string,
  date: number,
  isCurrMaintainer: boolean,
};

const AUTHORS: TAuthor[] = [
  {
    name: 'Вадим Гончаров',
    date: 2017,
    isCurrMaintainer: true,
  },
  {
    name: 'Алексей Анисимов',
    date: 2015,
    isCurrMaintainer: true,
  },
  {
    name: 'Андрей Шитов',
    date: 2007,
    isCurrMaintainer: false,
  },
  {
    name: 'Сергей Муратов',
    date: 2006,
    isCurrMaintainer: false,
  },
];

const MAIL_WORDS: string[] = ['почта', 'почва', 'почка'];

export default class Footer extends React.Component<any, any> {
  public render() {
    return (
      <section className="Footer">
        {this.renderAuthors()}
        {this.renderContacts()}
      </section>
    );
  }

  private renderAuthors() {
    return (
      <div className="Footer-authors">
        <div className="Footer-authorsOwner">Сайт откроется Людвигом Быстроновским.</div>
        <div className="Footer-authorsDevs">
          <span className="Footer-authorsDevsTitle">Над сайтооткрыванием работали:</span>
          <ol className="Footer-authorsDevsItems">
            {AUTHORS.map(this.renderItem)}
          </ol>
        </div>
      </div>
    );
  }

  private renderItem = (item: TAuthor, index: number) => {
    const devsItemClassName = classNames('Footer-authorsDevsItem', {
      'is-currMaintainer': item.isCurrMaintainer,
    });
    const {name, date} = item;
    return (
      <li className={devsItemClassName} key={index}>
        <span className="Footer-authorsDevsItemName">{name}</span>
        <span className="Footer-authorsDevsItemDate">{date}</span>
      </li>
    );
  };

  private renderContacts() {
    const mailWord = MAIL_WORDS[getRandomInt(0, MAIL_WORDS.length - 1)];
    return (
      <div className="Footer-contacts">
        Эл. {mailWord}: <Link href="mailto:ludwig@ludwigbistronovsky.ru">ludwig@ludwigbistronovsky.ru</Link>
      </div>
    );
  }
}
