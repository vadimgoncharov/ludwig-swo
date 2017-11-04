import * as React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import animateScrollTo from 'animated-scroll-to';
import {HEADER_ELEMENT_ID} from 'shared/ui/Header';
import NavItem from './NavItem';
import './Nav.scss';

import {TUiNavSection} from 'shared/types/UiNavSection';
type TProps = {
  navSections: TUiNavSection[],
};

export default class Nav extends React.Component<TProps, any> {
  public props: TProps;

  public render() {
    const {navSections} = this.props;
    return (
      <div className="Nav">
        <div className="Nav-title">Краткое содержание:</div>
        <div className="Nav-items">
          {navSections.slice(1).map((section, index) => {
            return (
              <NavItem {...section} key={index} />
            );
          })}
        </div>
      </div>
    );
  }
}
