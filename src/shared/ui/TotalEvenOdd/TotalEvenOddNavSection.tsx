import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const OrelImg = require('./navSectionOrel.png') as string;
const ReshkaImg = require('./navSectionReshka.png') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class TotalEvenOddNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private orelImg: HTMLDivElement;
  private reshkaImg: HTMLDivElement;
  private tween: TweenLite;
  private obj = {value: 1};

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
    const {orelImg, reshkaImg} = this;
    orelImg.style.opacity = '0';
    this.tween = new TweenLite(this.obj, 0.3, {
      value: 10,
      paused: true,
      ease: gsap.Linear.ease,
      onUpdate: () => {
        if (Math.round(this.obj.value) % 2 === 0) {
          TweenLite.set(orelImg, {opacity: 1});
          TweenLite.set(reshkaImg, {opacity: 0});
        } else {
          TweenLite.set(orelImg, {opacity: 0});
          TweenLite.set(reshkaImg, {opacity: 1});
        }
      },
    });
  }

  public render() {
    return (
      <div className="NavSection" ref={this.onRefSet} style={{position: 'relative'}}>
        <div
          className="NavSectionImg is-orel"
          style={{
            backgroundImage: `url(${OrelImg})`,
            backgroundSize: 'contain',
            width: '100px',
            height: '100px',
            position: 'absolute',
            left: '0',
            top: '0',
          }}
        />
        <div
          className="NavSectionImg is-reshka"
          style={{
            backgroundImage: `url(${ReshkaImg})`,
            backgroundSize: 'contain',
            width: '100px',
            height: '100px',
            position: 'absolute',
            left: '0',
            top: '0',
          }}
        />
      </div>
    );
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
    this.orelImg = el.querySelector('.is-orel') as HTMLDivElement;
    this.reshkaImg = el.querySelector('.is-reshka') as HTMLDivElement;
  };
}
