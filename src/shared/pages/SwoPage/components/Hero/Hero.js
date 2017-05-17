// @flow
import React, {Component} from 'react';

import Link from 'shared/components/Link';
import {dateToDayMonth} from 'shared/utils/date';
import type {StatTotal} from 'shared/reducers/stats';

import './Hero.scss';

type Props = {|
  isFetching: boolean,
  statTotal: StatTotal,
|};

export default class Hero extends Component<void, Props, any> {
  props: Props;

  render(): React$Element<any> {
    const {statTotal} = this.props;
    const date: string = dateToDayMonth(statTotal.date);

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
