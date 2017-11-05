import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const svg = require('./navSection.svg') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class SlashesNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private svgPolygons: SVGPolygonElement[];
  private tween: TweenLite;
  private obj = {
    selectedIndex: 5,
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
    const {svgPolygons, obj} = this;
    const svgPolygonsLen = svgPolygons.length;
    this.tween = new TweenLite(obj, 0.3, {
      selectedIndex: 9,
      paused: true,
      ease: gsap.Linear.easeInOut,
      onUpdate: () => {
        const newSelectedIndex = Math.round(obj.selectedIndex) % (svgPolygonsLen);
        svgPolygons.forEach((svgRect, index) => {
          if (index === newSelectedIndex) {
            svgRect.classList.add('SlashesSvgSelected');
          } else {
            svgRect.classList.remove('SlashesSvgSelected');
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
    this.svgPolygons = [].slice.call(el.querySelectorAll('polygon'));
  };
}
