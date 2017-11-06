import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
import {convertColor} from 'shared/utils/math';
const svg = require('./navSection.svg') as string;

type TPosition = {
  x: number,
  y: number,
  scale?: number,
  opacity?: number,
  transformOrigin?: string,
};
type TProps = {
  triggerAnimation: boolean,
};

export default class MinMaxNavSection extends React.Component<TProps, void> {
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
    const initialSelectedIndex = Math.round(svgPaths.length / 2 - 1);
    const initialColors = this.getFillColors(initialSelectedIndex);
    svgPaths.forEach((svgPath, index) => {
      svgPath.style.fill = initialColors[index];
    });
    const newSelectedIndex = svgPaths.length - 2;
    const newColors = this.getFillColors(newSelectedIndex);
    this.tweens = svgPaths.map((svgPath, index) => {
      return this.createTween(svgPath, newColors[index]);
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

  private getFillColors(selectedIndex: number): string[] {
    const colors = [];
    const colorMin = '#012331';
    const colorMax = '#00dbff';
    const {svgPaths} = this;
    const svgPathsLen = svgPaths.length;
    const valueMin = selectedIndex - (svgPathsLen - 1); // TODO this value could be wrong
    const valueMax = selectedIndex;

    for (let index = 0; index < selectedIndex; index++) {
      const fill = convertColor(index, valueMin, valueMax, colorMin, colorMax);
      colors.push(fill);
    }
    for (let index = selectedIndex, j = selectedIndex; index < svgPathsLen; index++, j--) {
      const fill = convertColor(j, valueMin, valueMax, colorMin, colorMax);
      colors.push(fill);
    }

    return colors;
  }

  private createTween(el: SVGPathElement, fill: string): TweenLite {
    return TweenLite.to(el, 0.3, {
      fill,
      paused: true,
      ease: gsap.Linear.easeInOut,
    });
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
    this.svgPaths = [].slice.call(el.querySelectorAll('path'));
  };
}
