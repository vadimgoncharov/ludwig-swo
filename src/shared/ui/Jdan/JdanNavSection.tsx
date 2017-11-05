import * as React from 'react';
import * as gsap from 'gsap';
import {TweenLite} from 'gsap';
const Img = require('./navSection.png') as string;

type TProps = {
  triggerAnimation: boolean,
};

export default class JdanNavSection extends React.Component<TProps, void> {
  private rootEl: HTMLElement;
  private img: HTMLImageElement;
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
    const {img} = this;
    TweenLite.set(img, {
      height: '85%',
    });
    this.tween = new TweenLite(img, 0.3, {
      height: '100%',
      paused: true,
      ease: gsap.Linear.easeInOut,
    });
  }

  public render() {
    return (
      <div className="NavSection" ref={this.onRefSet} style={{position: 'relative'}}>
        <img
          src={Img}
          alt=""
          style={{
            width: '100px',
            height: '100%',
            left: '0px',
            bottom: '0px',
            position: 'absolute',
          }}
        />
      </div>
    );
  }

  private onRefSet = (el: HTMLElement) => {
    this.rootEl = el;
    this.img = el.querySelector('img') as HTMLImageElement;
  };
}
