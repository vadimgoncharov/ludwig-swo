import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class TypogrNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgPaths: SVGPathElement[];
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
    const {svgPaths} = this;
    const svgPathsLen = svgPaths.length;
    const lastGlyph1 = svgPaths[svgPathsLen - 1];
    const lastGlyph2 = svgPaths[svgPathsLen - 2];
    const lastGlyph3 = svgPaths[svgPathsLen - 3];
    this.tweens = [
      new TweenLite(lastGlyph1, 0.3, {
        opacity: 0,
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
      new TweenLite(lastGlyph2, 0.3, {
        opacity: 1,
        paused: true,
        ease: gsap.Linear.easeInOut,
      }),
      new TweenLite(lastGlyph3, 0.3, {
        opacity: 1,
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
    this.svgPaths = [].slice.call(el.querySelectorAll('path'));
  };
}
