// @flow
import React, {Component} from 'react';
import classNames from 'classnames';

import Link from 'shared/components/Link';

import './Header.scss';

type Props = {
  isFetching: boolean,
  onFetchLinkClick: Function,
};

export default class Header extends Component<void, Props, void> {
  props: Props;

  onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
    if (!isFetching) {
      onFetchLinkClick();
    }
  }

  renderFetchButton() {
    const {isFetching} = this.props;
    const className = classNames('Header-fetchButton', `is-fetching_${isFetching ? 'yes' : 'no'}`);

    return (
      <div className={className} onClick={this.onFetchLinkClick}>
        <div className="Header-navItemContent">Другая дата</div>
      </div>
    );
  }

  render() {
    return (
      <div className="Header">
        <div className="Header-nav">
          <div className="Header-navItem is-main">
            <Link className="Header-navItemLink" href="/">
              <div className="Header-navItemContent" />
            </Link>
          </div>
          <div className="Header-navItem is-fetch">
            {this.renderFetchButton()}
          </div>
        </div>
      </div>
    );
  }
}
