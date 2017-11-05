import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class HalfYearNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgTexts: SVGTextElement[];
  private tween: TweenLite;
  private obj = {
    value1: 49.74,
    value2: 50.21,
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
    const {svgTexts, obj} = this;
    this.tween = new TweenLite(obj, 0.3, {
      value1: 49.79,
      value2: 50.35,
      paused: true,
      ease: gsap.Linear.easeInOut,
      onUpdate: () => {
        svgTexts[0].innerHTML = obj.value1.toFixed(2);
        svgTexts[1].innerHTML = obj.value2.toFixed(2);
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
    this.svgTexts = [].slice.call(el.querySelectorAll('text'));
  };
}
