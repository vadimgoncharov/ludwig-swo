import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TPosition = {
  x: number,
  y: number,
};

export default class PrevDatesNavSection extends React.Component<void, void> {
  private rootEl: HTMLElement;
  private svgSquare1: SVGPathElement;
  private svgSquare2: SVGPathElement;
  private svgSquare3: SVGPathElement;
  private svgSquare4: SVGPathElement;
  private svgSquare5: SVGPathElement;
  private svgSquare6: SVGPathElement;
  private svgSquare7: SVGPathElement;
  private svgSquare9: SVGPathElement;
  private tweens: TweenLite[];
  private position: TPosition[] = [
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 0, y: 0},
  ];
  private positionTo: TPosition[] = [
    {x: 29, y: 29},
    {x: -29, y: 29},
    {x: 0, y: 29},
    {x: 29, y: -29},
    {x: -29, y: -29},
    {x: 0, y: -29},
    {x: 29 * 2, y: 0},
    {x: -29 * 2, y: 0},
  ];
  public componentDidMount() {
    this.tweens = [
      this.createTween(this.svgSquare1, this.position[0], this.positionTo[0]),
      this.createTween(this.svgSquare2, this.position[1], this.positionTo[1]),
      this.createTween(this.svgSquare3, this.position[2], this.positionTo[2]),
      this.createTween(this.svgSquare4, this.position[3], this.positionTo[3]),
      this.createTween(this.svgSquare5, this.position[4], this.positionTo[4]),
      this.createTween(this.svgSquare6, this.position[5], this.positionTo[5]),
      this.createTween(this.svgSquare7, this.position[6], this.positionTo[6]),
      this.createTween(this.svgSquare9, this.position[7], this.positionTo[7]),
    ];
  }

  public render() {
    return (
      <div
        className="NavSection"
        ref={this.onRefSet}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        dangerouslySetInnerHTML={{__html: svg}}
      />
    );
  }

  private createTween(el: SVGPathElement, position: TPosition, positionTo: TPosition): TweenLite {
    return TweenLite.to(
      position,
      0.3,
      {
        ...positionTo,
        onUpdate: () => {
          this.move(el, position);
        },
        onUpdateParams: [el],
        paused: true,
        ease: gsap.Linear.easeInOut,
      });
  }

  private onMouseOver = () => {
    this.tweens.forEach((tween) => tween.play());
  };

  private onMouseLeave = () => {
    this.tweens.forEach((tween) => tween.reverse());
  };

  private move = (element: SVGPathElement, position: TPosition) => {
    const {x, y} = position;
    TweenLite.set(element, {
      x: `${x}px`,
      y: `${y}px`,
    });
  };

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
    const paths = el.querySelectorAll('path')
    this.svgSquare1 = paths[0] as SVGPathElement;
    this.svgSquare2 = paths[1] as SVGPathElement;
    this.svgSquare3 = paths[2] as SVGPathElement;
    this.svgSquare4 = paths[3] as SVGPathElement;
    this.svgSquare5 = paths[4] as SVGPathElement;
    this.svgSquare6 = paths[5] as SVGPathElement;
    this.svgSquare7 = paths[6] as SVGPathElement;
    this.svgSquare9 = paths[8] as SVGPathElement;
  };
}
