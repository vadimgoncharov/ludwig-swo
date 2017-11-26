import * as React from 'react';
import {connect} from 'react-redux';
import * as Waypoint from 'react-waypoint';
import * as classNames from 'classnames';
import * as onresize from 'onresize';
import analytics from 'shared/services/analytics';
import {GOAL_ID_SECTION_SCROLL_ENTER} from 'shared/constants/analytics';
import {HEADER_ELEMENT_ID} from 'shared/ui/Header';
import {
  addNavHashAction,
  removeNavHashAction,
} from 'shared/actions/ui';

import {TDispatch} from 'shared/types/Dispatch';
import Animator from 'shared/services/Animator';
import {TUiNavSection} from 'shared/types/UiNavSection';
type TOwnProps = {
  animator?: Animator<any>,
  className?: string,
  navSection: TUiNavSection,
};
type TStateFromProps = {};
type TDispatchFromProps = {
  addNavSelectedHash: (hash: string) => void,
  removeNavSelectedHash: (hash: string) => void,
}
type TState = {
  isInViewport: boolean,
  headerHeight: number,
};

const mapDispatchToProps = (dispatch: TDispatch): TDispatchFromProps => {
  return {
    addNavSelectedHash: (hash: string): void => {
      dispatch(addNavHashAction(hash));
    },
    removeNavSelectedHash: (hash: string): void => {
      dispatch(removeNavHashAction(hash));
    },
  };
};


class SectionContent extends React.Component<TStateFromProps & TDispatchFromProps & TOwnProps, TState> {
  public state: TState = {
    isInViewport: false,
    headerHeight: 0,
  };
  private headerElement: HTMLElement;

  public componentDidMount() {
    this.headerElement = document.getElementById(HEADER_ELEMENT_ID);
    this.recalculateHeaderHeight();
    onresize.on(this.onResize);
  }

  public componentWillUnmount() {
    onresize.off(this.onResize);
  }

  public render() {
    const {className, children, navSection} = this.props;
    const {isInViewport, headerHeight} = this.state;
    const rootClassName = classNames('SectionContent', className, {
      'is-inViewport': isInViewport,
    });

    return (
      <Waypoint
        onPositionChange={this.onSectionPositionChange}
      >
        <div className={rootClassName} id={`section_${navSection.hash}`}>
          <a id={navSection.hash} />
          {children}
        </div>
      </Waypoint>
    );
  }

  private onResize = () => {
    this.recalculateHeaderHeight();
  };

  private recalculateHeaderHeight = () => {
    const {headerElement} = this;
    if (!headerElement) {
      return;
    }
    const headerHeight = headerElement.offsetHeight;
    this.setState({
      headerHeight,
    });
  };

  private onSectionPositionChange = (data): void => {
    const {
      animator,
      navSection: {title, hash},
      addNavSelectedHash,
      removeNavSelectedHash,
    } = this.props;
    const isInViewport = data.currentPosition === 'inside';

    this.setState({
      isInViewport,
    });

    if (isInViewport) {
      analytics.reachYaGoal(GOAL_ID_SECTION_SCROLL_ENTER, {hash});
      addNavSelectedHash(hash);
    } else {
      removeNavSelectedHash(hash);
    }

    if (animator) {
      isInViewport ? animator.enableAnimation() : animator.disableAnimation();
    }
  };
}

export default connect<TStateFromProps, TDispatchFromProps, TOwnProps>(
  null,
  mapDispatchToProps,
)(SectionContent);
