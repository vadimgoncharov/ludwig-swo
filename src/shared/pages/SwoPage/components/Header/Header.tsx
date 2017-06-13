import * as React from 'react';
import * as classNames from 'classnames';

import Link from 'shared/components/Link';

import './Header.scss';

type Props = {
  isFetching: boolean,
  onFetchLinkClick: () => void,
};

export default class Header extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  public onFetchLinkClick = () => {
    const {isFetching, onFetchLinkClick} = this.props;
    if (!isFetching) {
      onFetchLinkClick();
    }
  }

  public renderFetchButton() {
    const {isFetching} = this.props;
    const className = classNames('Header-fetchButton', `is-fetching_${isFetching ? 'yes' : 'no'}`);

    return (
      <div className={className} onClick={this.onFetchLinkClick}>
        <div className="Header-navItemContent">Другая дата</div>
      </div>
    );
  }

  public render() {
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
