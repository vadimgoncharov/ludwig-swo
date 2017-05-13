import React, {Component} from 'react';

import Link from 'shared/components/Link/Link';

import './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Header-nav">
          <Link href="/">this is link</Link>
        </div>
      </div>
    );
  }
}
