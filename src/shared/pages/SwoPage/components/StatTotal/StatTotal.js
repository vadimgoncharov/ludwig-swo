// @flow
import React, {Component} from 'react';
import formatThousands from 'format-thousands';
import pluralize from 'plural-ru';

import Link from 'shared/components/Link/Link';

import './StatTotal.scss';

export default class StatTotal extends Component {
  renderTotalValueFormatted(value: number): string {
    const formatted: string = formatThousands(value);
    const postfix: string = pluralize(value, 'раз', 'раза', 'раз');

    return `${formatted} ${postfix}`;
  }

  renderSumOfNumber(value: number): string {
    const numArr: number[] = value
      .toString()
      .split('')
      .map((value: string) => parseInt(value));

    const sum: number = numArr.reduce((sum: number, value: number) => {
      sum += value;
      return sum;
    }, 0);

    const numSumStr: string = numArr.join(' + ');

    return `${numSumStr} = ${sum}`;
  }

  render(): React$Element<any> {
    const totalValue: number = 2963178;

    return (
      <div className="StatTotal">
        <a name="stat" />
        <div className="StatTotal-title">Минутка статистика</div>
        <div className="StatTotal-subTitle">Всего сайт откроется</div>
        <div className="StatTotal-totalValue">{this.renderTotalValueFormatted(totalValue)}</div>
        <div className="StatTotal-refreshLinkContainer">
          <Link className="StatTotal-refreshLink" href="/#stat">И еще раз</Link>
        </div>
        <div className="StatTotal-description">
          Каждый раз сайт сообщает новую случайную дату открытия.<br />
          Все обещания бережно записываются, и на их основе строится статистика.</div>
        <div className="StatTotal-sumOfNum">Кстати, {this.renderSumOfNumber(totalValue)}.</div>
      </div>
    );
  }
}
