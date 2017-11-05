import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class SumColumnsNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgGroups: SVGGElement[];
  private tween: TweenLite;
  private obj = {
    selectedIndex: 10,
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
    const {svgGroups, obj} = this;
    const svgGroupsLen = svgGroups.length;
    this.tween = new TweenLite(obj, 0.3, {
      selectedIndex: 3,
      paused: true,
      ease: gsap.Linear.easeInOut,
      onUpdate: () => {
        const newSelectedIndex = Math.round(obj.selectedIndex) % (svgGroupsLen - 1);
        svgGroups.forEach((svgRect, index) => {
          if (index === newSelectedIndex) {
            svgRect.classList.add('SumColumnsSvgSelected');
          } else {
            svgRect.classList.remove('SumColumnsSvgSelected');
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
    this.svgGroups = [].slice.call(el.querySelectorAll('g'));
  };
}
