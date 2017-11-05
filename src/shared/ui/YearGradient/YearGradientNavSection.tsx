import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class YearGradientNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgRect: SVGRectElement;
  private tween: TweenLite;
  private obj = {
    selectedIndex: 10,
  };

  public componentWillReceiveProps(nextProps: TProps) {
    if (this.props.triggerAnimation !== nextProps.triggerAnimation) {
      if (nextProps.triggerAnimation) {
        this.tween.play();
      } else {
        this.tween.reverse();
      }
    }
  }

  public componentDidMount() {
    this.tween = new TweenLite(this.svgRect, 0.3, {
      x: -25,
      paused: true,
      ease: gsap.Linear.easeInOut,
    });
  }

  public render() {
    return (
      <div
        className="NavSection"
        ref={this.onRefSet}
        dangerouslySetInnerHTML={{__html: svg}}
      />
    );
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
    const rects = [].slice.call(el.querySelectorAll('rect'));
    this.svgRect = rects[1];
  };
}
