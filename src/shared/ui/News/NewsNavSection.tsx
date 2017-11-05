import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class NewsNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgPolygon: SVGPolygonElement;
  private tween: TweenLite;
  private obj = {
    selectedIndex: 9,
  };

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
    this.tween = new TweenLite(this.svgPolygon, 0.3, {
      fill: '#F9A33F',
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
    this.svgPolygon = el.querySelector('polygon') as SVGPolygonElement;
  };
}
