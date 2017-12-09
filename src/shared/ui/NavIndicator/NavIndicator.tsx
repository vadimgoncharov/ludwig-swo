import * as React from 'react';
import * as classNames from 'classnames';
import {CSSTransitionGroup} from 'react-transition-group';
import animateScrollTo from 'animated-scroll-to';
import analytics from 'shared/services/analytics';
import {
  GOAL_ID_NAVBAR_NAV_ITEM_CLICK,
  GOAL_ID_NAVBAR_NAV_ITEM_HOVER,
} from 'shared/constants/analytics';
import {HEADER_ELEMENT_ID} from 'shared/ui/Header';
import './NavIndicator.scss';

import {TUiNavSection} from 'shared/types/UiNavSection';
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
            const {title, hash, img} = section;
            const isSelected = selectedNavHashes[hash];
            let isSelectedFirst = false;
            if (!atLeastOneHashSelected && isSelected) {
              atLeastOneHashSelected = true;
              isSelectedFirst = true;
            }
            const className = classNames('NavIndicator-item', {
              'is-selectedFirst': isSelectedFirst,
              'is-selected': isSelected,
              'is-hasImg': Boolean(img),
            });
            return (
              <button
                type="button"
                className={className}
                key={index}
                data-target={`section_${hash}`}
                data-hash={hash}
                onClick={this.onClick}
                onMouseEnter={this.onPointerEnter}
                onFocus={this.onPointerEnter}
                title={title}
              >{img && <div className="NavIndicator-itemImg" dangerouslySetInnerHTML={{__html: img}} />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  private onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const {target: targetId, hash} = event.currentTarget.dataset;
    const targetEl = document.getElementById(targetId);
    analytics.reachYaGoal(GOAL_ID_NAVBAR_NAV_ITEM_CLICK, {hash});
    // const headerEl = document.getElementById(HEADER_ELEMENT_ID);
    const SAFE_PADDING = 10;
    if (targetEl) {
      const pos = (
        targetEl.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top -
        SAFE_PADDING
      );
      animateScrollTo(pos);
    }
  };

  private onPointerEnter = (event: React.FormEvent<HTMLButtonElement>) => {
    const {hash} = event.currentTarget.dataset;
    analytics.reachYaGoal(GOAL_ID_NAVBAR_NAV_ITEM_HOVER, {hash});
  };
}
