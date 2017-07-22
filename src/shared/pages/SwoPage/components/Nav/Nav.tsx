import * as React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import animateScrollTo from 'animated-scroll-to';

import {HEADER_ELEMENT_ID} from 'shared/pages/SwoPage/components/Header';

import {TUiNavSection} from 'shared/types/UiNavSection';

import './Nav.scss';

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
              <div
                className="Nav-item"
                key={index}
                data-target={`section_${section.hash}`}
                onClick={this.onClick}
              >
                {section.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  private onClick = (event: React.FormEvent<HTMLDivElement>) => {
    const targetId = event.currentTarget.dataset.target;
    const targetEl = document.getElementById(targetId);
    const headerEl = document.getElementById(HEADER_ELEMENT_ID);
    const SAFE_PADDING = 10;
    if (targetEl) {
      const pos = (
        targetEl.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        headerEl.offsetHeight -
        SAFE_PADDING
      );
      animateScrollTo(pos);
    }
  };
}
