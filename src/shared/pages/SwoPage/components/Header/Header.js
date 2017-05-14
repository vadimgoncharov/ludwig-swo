import React, {Component} from 'react';

import Link from 'shared/components/Link';

import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Header-nav">
          <div className="Header-navItem is-main">
            <Link className="Header-navItemLink" href="/">
              <div className="Header-navItemContent" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
