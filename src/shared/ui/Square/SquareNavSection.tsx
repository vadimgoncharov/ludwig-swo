import * as React from 'react';
import * as gsap from 'gsap';
import {TimelineLite, TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class SquareNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgRects: SVGRectElement[];
  private tweens: TweenLite[];

  public componentWillReceiveProps(nextProps: TProps) {
    if (this.props.triggerAnimation !== nextProps.triggerAnimation) {
      if (nextProps.triggerAnimation) {
        this.tweens.forEach((tween) => tween.play());
      } else {
        this.tweens.forEach((tween) => tween.reverse());
      }
    }
  }

  public componentDidMount() {
    this.tweens = this.svgRects.map((svgRect, index) => {
      return new TweenLite(svgRect, 0.3, {
        opacity: 0,
        scale: 0,
        transformOrigin: 'center',
        paused: true,
        ease: gsap.Linear.easeInOut,
      });
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
    const svgGroups = [].slice.call(el.querySelectorAll('g'));
    this.svgRects = [].slice.call(svgGroups[1].querySelectorAll('rect'));
  };
}
