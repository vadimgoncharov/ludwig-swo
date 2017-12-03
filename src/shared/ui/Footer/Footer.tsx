import * as React from 'react';
import * as classNames from 'classnames';
import './Footer.scss';

type TAuthor = {
  name: string,
  role?: string,
  date: number,
  isCurrMaintainer: boolean,
  link?: string,
};
const AUTHORS: TAuthor[] = [
  {
    name: 'Людвиг Быстроновский',
    date: 2006,
    isCurrMaintainer: true,
    link: '/',
  },
  {
    name: 'Вадим Гончаров',
    role: 'Дизайнер-технолог',
    date: 2017,
    isCurrMaintainer: true,
    link: 'http://vadimgoncharov.ru',
  },
  {
    name: 'Лёля Ле',
    role: 'Технический дизайнер',
    date: 2017,
    isCurrMaintainer: true,
    link: 'http://leindustrial.ru',
  },
  {
    name: 'Стас Щербаков',
    role: 'Фотограф',
    date: 2017,
    isCurrMaintainer: false,
  },
  {
    name: 'Алексей Анисимов',
    role: 'Технолог',
    date: 2015,
    isCurrMaintainer: true,
    link: 'http://for-fun-dev.com',
  },
  {
    name: 'Андрей Шитов',
    role: 'Технолог',
    date: 2007,
    isCurrMaintainer: false,
    link: 'http://shitov.ru',
  },
  {
    name: 'Сергей Муратов',
    role: 'Технолог',
    date: 2006,
    isCurrMaintainer: false,
  },
];

export default class Footer extends React.Component<any, any> {
  public render() {
    return (
      <section className="Footer">
        {this.renderAuthors()}
      </section>
    );
  }

  private renderAuthors() {
    return (
      <div className="Footer-authors">
        <div className="Footer-authorsTitle">Над сайтооткрыванием работали</div>
        <div className="Footer-authorsItemsItemsContainer">
          <ol className="Footer-authorsItems">
            {AUTHORS.map(this.renderItem)}
          </ol>
        </div>
      </div>
    );
  }

  private renderItem = (item: TAuthor, index: number) => {
    const devsItemClassName = classNames('Footer-authorsItem', {
      'is-currMaintainer': item.isCurrMaintainer,
    });
    const {name, role, date, link} = item;
    let devName = (
      <div className="Footer-authorsItemName">{name}</div>
    );
    if (link) {
      devName = (
        <a className="Link" href={link}>{devName}</a>
      );
    }
    return (
      <li className={devsItemClassName} key={index}>
        <div className="Footer-authorsItemLayout">
          {devName}
          {Boolean(role) && <div className="Footer-authorsItemRole">{role}</div>}
          <div className="Footer-authorsItemDate">{date}</div>
        </div>
      </li>
    );
  };
}
