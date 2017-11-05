import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class DayInYearScaleNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgRotatingPath: SVGPathElement;
  private tween: TweenLite;

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
    this.tween = new TweenLite(this.svgRotatingPath, 0.3, {
      transformOrigin: `0 ${85 / 2}px`, // Half of viewBox
      rotation: 70,
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
    this.svgRotatingPath = el.querySelector('.DayInYearScaleSvgRotatingPath') as SVGPathElement;
  };
}
