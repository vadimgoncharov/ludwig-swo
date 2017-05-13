// @flow
import React, {Component} from 'react';

import Link from 'shared/components/Link/Link';

import './Hero.scss';

export default class Hero extends Component {
  render(): React$Element<any> {
    const date: string = '7 сентября';

    return (
      <div className="Hero">
        <div className="Hero-swo">
          Сайт откроется <span className="Hero-swoDate">{date}</span>
        </div>
        <div className="Hero-nav">
          <span className="Hero-navItem is-refresh">
            <Link href="/">Другой вариант</Link>
          </span> или <span className="Hero-navItem is-stat">
            <Link href="/#stat">минутка статистика</Link>
          </span>
        </div>
      </div>
    );
  }
}
