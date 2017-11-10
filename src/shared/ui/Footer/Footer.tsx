import * as React from 'react';
import * as classNames from 'classnames';
import Link from '../Link';
import {getRandomInt} from 'shared/utils/random';
import './Footer.scss';

type TAuthor = {
  name: string,
  date: number,
  isCurrMaintainer: boolean,
  link?: string,
};
const AUTHORS: TAuthor[] = [
  {
    name: 'Вадим Гончаров',
    date: 2017,
    isCurrMaintainer: true,
    link: 'http://vadimgoncharov.ru',
  },
  {
    name: 'Алексей Анисимов',
    date: 2015,
    isCurrMaintainer: true,
    link: 'http://for-fun-dev.com',
  },
  {
    name: 'Андрей Шитов',
    date: 2007,
    isCurrMaintainer: false,
    link: 'http://shitov.ru',
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
        <div className="Footer-authorsOwner">
          Сайт откроется <a className="Link" href="/">Людвигом Быстроновским</a>
        </div>
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
    const {name, date, link} = item;
    let devName = (
      <span className="Footer-authorsDevsItemName">{name}</span>
    );
    if (link) {
      devName = (
        <a className="Link" href={link}>{devName}</a>
      );
    }
    return (
      <li className={devsItemClassName} key={index}>
        {devName}
        <span className="Footer-authorsDevsItemDate">{date}</span>
      </li>
    );
  };

  private renderContacts() {
    const mailWord = MAIL_WORDS[getRandomInt(0, MAIL_WORDS.length - 1)];
    return (
      <div className="Footer-contacts">
        Эл. {mailWord}: <Link href="mailto:lu@ldwg.ru">lu@ldwg.ru</Link>
      </div>
    );
  }
}
