// @flow
import React, {Component} from 'react';
import classNames from 'classnames';

import './Link.scss';

type DefaultProps = {
  className: ?string,
};

type Props = {
  className?: ?string,
  children?: string | React$Element<any>,
  href: string,
};

export default class Link extends Component<DefaultProps, Props, void> {
  props: Props;
  static defaultProps = {
    className: null,
  };

  render(): React$Element<any> {
    const {children, href, className} = this.props;
    // FIXME Turn back real props.href
    return (
      <a className={classNames('Link', className)} href="#">{children}</a>
    );
  }
}
