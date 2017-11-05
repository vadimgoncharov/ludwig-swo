import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class CurrDayAbbrNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgLeftQuote: SVGPathElement;
  private svgRightQuote: SVGPathElement;
  private svgLine: SVGRectElement;
  private svgGlyph: SVGPathElement;
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
    const {svgLeftQuote, svgRightQuote, svgGlyph, svgLine} = this;
    TweenLite.set(svgGlyph, {
      scaleX: 0,
      opacity: 0,
      ease: gsap.Linear.easeInOut,
    });
    this.tweens = [
      new TweenLite(svgLeftQuote, 0.3, {
        x: '0',
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
      new TweenLite(svgRightQuote, 0.3, {
        x: '0',
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
      new TweenLite(svgGlyph, 0.3, {
        scaleX: 1,
        // transformOrigin: '-30px center',
        opacity: 1,
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
      new TweenLite(svgLine, 0.3, {
        x: '24px',
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
    ];
    // svgLine.style.transform = 'translateX(24)';
    // this.tween = new TweenLite(this.svgRotatingPath, 0.3, {
    //   transformOrigin: `0 ${85 / 2}px`, // Half of viewBox
    //   rotation: 70,
    //   paused: true,
    //   ease: gsap.Linear.easeInOut,
    // });
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
    this.svgGlyph = paths[2];
    this.svgLine = el.querySelector('rect');
  };
}
