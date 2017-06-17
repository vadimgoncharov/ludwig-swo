import * as React from 'react';
import * as classNames from 'classnames';

import Link from 'shared/components/Link';
import {dateToDayMonth} from 'shared/utils/date';

import {TStatTotal} from 'shared/types/StatTotal';

import './Header.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
  onFetchLinkClick: () => void,
};

export default class Header extends React.Component<TProps, any> {
  public props: TProps;

  public render() {
    return (
      <div className="Header">
        <div className="Header-nav">
          <div className="Header-navItem is-main">
            <Link className="Header-navItemLink" href="/">
              <div className="Header-navItemContent" />
            </Link>
          </div>
          <div className="Header-navItem is-swo">
            {this.renderSwoDate()}
          </div>
        </div>
      </div>
    );
  }

  private onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
    if (!isFetching) {
      onFetchLinkClick();
    }
  }

  private renderSwoDate() {
    const date = dateToDayMonth(this.props.statTotal.date);
    const {isFetching} = this.props;
    const className = classNames('Header-swoDate', `is-fetching_${isFetching ? 'yes' : 'no'}`);

    return (
      <div className={className}>
        <span className="Header-swoDateValue">Сайт откроется {date}</span>{' '}
        <span className="Header-swoDateFetchButton" onClick={this.onFetchLinkClick}>Другая дата</span>
      </div>
    );
  }
}
