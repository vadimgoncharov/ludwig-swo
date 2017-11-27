import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSectionWithMask.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class CurrDayAbbrNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgLeftQuote: SVGPathElement;
  private svgRightQuote: SVGPathElement;
  private svgLine: SVGRectElement;
  private svgGlyphClipRect: SVGRectElement;
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
    const {svgLeftQuote, svgRightQuote, svgLine, svgGlyphClipRect} = this;
    const TIME = 0.2;
    const EASING = gsap.Linear.easeIn;
    TweenLite.set(svgGlyphClipRect, {
      x: -60,
      ease: gsap.Linear.easeInOut,
    });
    this.tweens = [
      new TweenLite(svgLeftQuote, TIME, {
        x: 0,
        paused: true,
        ease: EASING,
      }),
      new TweenLite(svgRightQuote, TIME, {
        x: 0,
        paused: true,
        ease: EASING,
      }),
      new TweenLite(svgGlyphClipRect, TIME, {
        x: 0,
        paused: true,
        ease: EASING,
      }),
      new TweenLite(svgLine, TIME, {
        x: 24,
        paused: true,
        ease: EASING,
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
    const paths = [].slice.call(el.querySelectorAll('path'));
    this.svgLeftQuote = paths[0];
    this.svgRightQuote = paths[1];
    this.svgLine = el.querySelector('.SvgLine');
    this.svgGlyphClipRect = this.rootEl.querySelector('clipPath rect');
  };
}
