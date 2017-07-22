import * as React from 'react';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';
import animateScrollTo from 'animated-scroll-to';

import {HEADER_ELEMENT_ID} from 'shared/pages/SwoPage/components/Header';

import {TUiNavSection} from 'shared/types/UiNavSection';

import './NavIndicator.scss';

type TProps = {
  selectedNavHashes: {[key: string]: boolean},
  navSections: TUiNavSection[],
};


export default class NavIndicator extends React.Component<TProps, any> {
  public props: TProps;

  public render() {
    const {navSections, selectedNavHashes} = this.props;
    let atLeastOneHashSelected = false;
    return (
      <div className="NavIndicator">
        <div className="NavIndicator-items">
          {navSections.map((section, index) => {
            const isSelected = selectedNavHashes[section.hash];
            let isSelectedFirst = false;
            if (!atLeastOneHashSelected && isSelected) {
              atLeastOneHashSelected = true;
              isSelectedFirst = true;
            }
            const className = classNames('NavIndicator-item', {
              'is-selectedFirst': isSelectedFirst,
              'is-selected': isSelected,
            });
            return (
              <div
                className={className}
                key={index}
                data-target={`section_${section.hash}`}
                onClick={this.onClick}
                title={section.title}
              />
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
