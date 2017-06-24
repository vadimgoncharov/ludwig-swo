import * as React from 'react';
import * as classNames from 'classnames';

import './Link.scss';


interface IProps {
  className?: string;
  children?: any;
  href: string;
}

export default class Link extends React.Component<IProps, any> {
  public render() {
    const {children, href, className} = this.props;
    // FIXME Turn back real props.href
    return (
      <a className={classNames('Link', className)} href="#">{children}</a>
    );
  }
}
