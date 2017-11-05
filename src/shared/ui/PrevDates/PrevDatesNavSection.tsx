import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TStyle = {
  x: number,
  y: number,
  scale?: number,
  opacity?: number,
  transformOrigin?: string,
};
type TProps = {
  triggerAnimation: boolean,
};

export default class PrevDatesNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgSquares: SVGPathElement[];
  private tweens: TweenLite[];
  private styleTo: TStyle[] = [
    {x: 0, y: 0, opacity: 1, scale: 1},
    {x: 29, y: 0},
    {x: 29, y: 0},
    {x: -29 * 2, y: 29},
    {x: 29, y: 0},
    {x: 29 , y: 0},
    {x: -29 * 2, y: 29},
    {x: 29, y: 0},
    {x: 29, y: 0},
    {x: 29, y: 0, opacity: 0, scale: 0, transformOrigin: 'center'},
  ];

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
    this.tweens = this.svgSquares.map((svgSquare, index) => {
      return this.createTween(svgSquare, this.styleTo[index]);
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

  private createTween(el: SVGPathElement, styleTo: TStyle): TweenLite {
    return TweenLite.to(el, 0.3, {
      ...styleTo,
      paused: true,
      ease: gsap.Linear.easeInOut,
    });
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
    this.svgSquares = [].slice.call(el.querySelectorAll('path')).sort((a, b) => {
      return a.getAttribute('data-order') - b.getAttribute('data-order');
    });
  };
}
