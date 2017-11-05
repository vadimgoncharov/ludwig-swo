import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class TowerNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgRects: SVGRectElement[];
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
    const {svgRects, obj} = this;
    const svgRectsLen = svgRects.length;
    this.tween = new TweenLite(obj, 0.3, {
      selectedIndex: 1,
      paused: true,
      ease: gsap.Linear.easeInOut,
      onUpdate: () => {
        const newSelectedIndex = Math.round(obj.selectedIndex) % (svgRectsLen);
        svgRects.forEach((svgRect, index) => {
          if (index === newSelectedIndex) {
            svgRect.classList.add('TowerSvgSelected');
          } else {
            svgRect.classList.remove('TowerSvgSelected');
          }
        });
      },
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
    this.svgRects = [].slice.call(el.querySelectorAll('rect'));
  };
}
