import * as React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import animateScrollTo from 'animated-scroll-to';
import analytics from 'shared/services/analytics';
import {
  GOAL_ID_SECTION_NAV_ITEM_CLICK,
  GOAL_ID_SECTION_NAV_ITEM_HOVER,
} from 'shared/constants/analytics';
import {HEADER_ELEMENT_ID} from 'shared/ui/Header';
import './Nav.scss';

import {TUiNavSection} from 'shared/types/UiNavSection';
type TProps = {
  hash: string,
  title: string,
  img?: string,
  Component?: any,
};
type TState = {
  triggerAnimation: boolean,
};

export default class NavItem extends React.Component<TProps, any> {
  public props: TProps;
  public state: TState = {
    triggerAnimation: false,
  };

  public render() {
    const {hash, Component, title, img} = this.props;
    const {triggerAnimation} = this.state;
    return (
      <button
        className="Nav-item"
        data-target={`section_${hash}`}
        data-hash={hash}
        onClick={this.onClick}
        onMouseEnter={this.onPointerEnter}
        onMouseLeave={this.onPointerLeave}
        onFocus={this.onPointerEnter}
        onBlur={this.onPointerLeave}
        tabIndex={0}
      >
        {Component && <div className="Nav-itemImg"><Component triggerAnimation={triggerAnimation} /></div>}
        {(!Component && img) && <div className="Nav-itemImg" dangerouslySetInnerHTML={{__html: img}} />}
        <div className="Nav-itemTitle">{title}</div>
      </button>
    );
  }

  private onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const {target: targetId, hash} = event.currentTarget.dataset;
    const targetEl = document.getElementById(targetId);
    analytics.reachYaGoal(GOAL_ID_SECTION_NAV_ITEM_CLICK, {hash});
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
    analytics.reachYaGoal(GOAL_ID_SECTION_NAV_ITEM_HOVER, {hash});
    if (!this.state.triggerAnimation) {
      this.setState({
        triggerAnimation: true,
      });
    }
  };

  private onPointerLeave = () => {
    if (this.state.triggerAnimation) {
      this.setState({
        triggerAnimation: false,
      });
    }
  };
}
