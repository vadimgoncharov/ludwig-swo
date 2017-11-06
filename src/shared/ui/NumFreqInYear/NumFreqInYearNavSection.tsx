import * as React from 'react';
import * as gsap from 'gsap';
import {TimelineLite, TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class NumFreqInYearNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgRects: SVGRectElement[];
  private tween: TweenLite;
  private obj = {
    selectedIndex1: 2,
    selectedIndex2: 7,
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
      selectedIndex1: 0,
      selectedIndex2: 4,
      paused: true,
      ease: gsap.Linear.easeInOut,
      onUpdate: () => {
        const newSelectedIndex1 = Math.round(obj.selectedIndex1) % (svgRectsLen);
        const newSelectedIndex2 = Math.round(obj.selectedIndex2) % (svgRectsLen);
        svgRects.forEach((svgRect, index) => {
            svgRect.classList.remove('NumFreqInYearSvg0');
            svgRect.classList.remove('NumFreqInYearSvg1');
            if (index === newSelectedIndex1 || index === newSelectedIndex2) {
              svgRect.classList.add('NumFreqInYearSvg1');
            } else {
              svgRect.classList.add('NumFreqInYearSvg0');
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
