import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TPosition = {
  x: number,
  y: number,
};
type TProps = {
  triggerAnimation: boolean,
};

export default class MonthInCloudsNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgNumber1: SVGPathElement;
  private svgNumber2: SVGPathElement;
  private tweens: TweenLite[];
  private position: TPosition[] = [
    {x: 0, y: 0},
    {x: 0, y: 0},
  ];
  private positionTo: TPosition[] = [
    {x: 55, y: 0},
    {x: -42, y: 0},
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
    this.tweens = [
      this.createTween(this.svgNumber1, this.position[0], this.positionTo[0]),
      this.createTween(this.svgNumber2, this.position[1], this.positionTo[1]),
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
    this.svgNumber1 = paths[0] as SVGPathElement;
    this.svgNumber2 = paths[1] as SVGPathElement;
  };
}
