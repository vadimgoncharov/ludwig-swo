import * as React from 'react';
import * as gsap from 'gsap';
import {TimelineLite, TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class SeasonsNavSection extends React.Component<TProps, void> {
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
    const {svgRects} = this;
    const winterLine = svgRects[3];
    const springLine = svgRects[2];
    TweenLite.set(winterLine, {height: '1px'});
    TweenLite.set(springLine, {height: '6px'});
    this.tweens = [
      new TweenLite(winterLine, 0.3, {
        height: '6px',
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
      new TweenLite(springLine, 0.3, {
        height: '1px',
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
    ];
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
    this.svgRects = [].slice.call(el.querySelectorAll('rect'));
  };
}
