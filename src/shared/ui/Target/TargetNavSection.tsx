import * as React from 'react';
import * as gsap from 'gsap';
import {TimelineLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class TargetNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgCircles: SVGCircleElement[];
  private timeline: TimelineLite;

  public componentWillReceiveProps(nextProps: TProps) {
    if (this.props.triggerAnimation !== nextProps.triggerAnimation) {
      if (nextProps.triggerAnimation) {
        this.timeline.play();
      } else {
        this.timeline.reverse();
      }
    }
  }

  public componentDidMount() {
    const tl = new TimelineLite();
    tl.pause();
    const circlesLen = this.svgCircles.length;
    this.svgCircles.forEach((svgCircle, index) => {
      tl.to(svgCircle, 0.4 / circlesLen, {
        opacity: 1,
        ease: gsap.Linear.easeInOut,
      });
    });
    this.timeline = tl;
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
    this.svgCircles = [].slice.call(el.querySelectorAll('.TargetSvgCircle'));
  };
}
