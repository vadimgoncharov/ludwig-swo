import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class AroundNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgPaths: SVGPathElement;
  private tweens: TweenLite[];
  private stylesTo: Array<{fill: string}> = [
    {fill: '#009b96'},
    {fill: '#012331'},
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
    const {svgPaths, stylesTo} = this;
    const middleLine = svgPaths[1];
    const bottomLine = svgPaths[2];
    this.tweens = [
      new TweenLite(middleLine, 0.3, {
        ...stylesTo[0],
        ease: gsap.Linear.easeInOut,
        paused: true,
      }),
      new TweenLite(bottomLine, 0.3, {
        ...stylesTo[1],
        ease: gsap.Linear.easeInOut,
        paused: true,
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
    this.svgPaths = [].slice.call(el.querySelectorAll('path'));
  };
}
