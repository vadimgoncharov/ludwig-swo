import * as React from 'react';
import * as gsap from 'gsap';
import {TimelineLite, TimelineMax} from 'gsap';
const poloterSvg = require('./poloter.svg') as string;
import './Poloter.scss';

type TProps = {
  isFetching: boolean,
  isMirrored?: boolean,
};

// TODO Replace BODY_MOVE_DISTANCE to container width calculated dynamically
const BODY_MOVE_DISTANCE = 230;
const BODY_MOVE_TIME_DEFAULT = 5;
const BODY_MOVE_TIME_SLIDE = 2.5;
const FOOT_TO_SLIDE_TIME = 0.3;
const FOOT_FROM_SLIDE_TIME = 0.2;
const FOOT_LEFT_TRANSFORM_ORIGIN = '90 82';
const FOOT_RIGHT_TRANSFORM_ORIGIN = '105 80';
const FOOT_ROTATE_TIME = 0.4;
const FOOT_LEFT_ROTATE_ANGLE_DEFAULT = 50;
const FOOT_RIGHT_ROTATE_ANGLE_DEFAULT = 55;
const FOOT_ROTATE_ANGLE_SLIDE = 75;

export default class Poloter extends React.Component<TProps, any> {
  public props: TProps;
  private rootEl: HTMLElement;
  private svgRootEl: SVGElement;
  private footLeftEl: SVGGElement;
  private footRightEl: SVGGElement;

  private moveBodyTimeline: TimelineMax;
  private moveFootTimeline: TimelineLite;

  public componentDidMount() {
    this.initDom();
    this.startAnimation();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    if (this.props.isFetching === nextProps.isFetching) {
      return;
    }
    if (nextProps.isFetching) {
      this.startFootToSlideAnimation();
    } else {
      setTimeout(() => {
        this.startSlideToFootAnimation();
      }, 1000);
    }
  }

  public render() {
    const className = `Poloter is-mirrored_${this.props.isMirrored ? 'yes' : 'no'}`
    return (
      <div className={className} ref={this.onRootRefSet} dangerouslySetInnerHTML={{__html: poloterSvg}} />
    );
  }

  private onRootRefSet = (el: HTMLElement) => {
    this.rootEl = el;
  };

  private initDom() {
    const {rootEl} = this;
    if (rootEl && !this.svgRootEl) {
      const svgRootEl = rootEl.querySelector('svg');
      const footLeftEl = svgRootEl.querySelector('.footLeft') as SVGGElement;
      const footRightEl = svgRootEl.querySelector('.footRight') as SVGGElement;

      this.svgRootEl = svgRootEl;
      this.footLeftEl = footLeftEl;
      this.footRightEl = footRightEl;
    }
  }

  private startMoveBodyAnimation() {
    if (this.moveBodyTimeline) {
      return;
    }
    const timeline = new TimelineMax({
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
      ease: gsap.Linear.easeNone,
    });

    timeline
      .add('test')
      .to(this.svgRootEl, BODY_MOVE_TIME_DEFAULT, {
      svgOrigin: 'center center',
      x: BODY_MOVE_DISTANCE,
      ease: gsap.Linear.easeNone,
      onStart: () => {
        timeline.to(this.svgRootEl, 0, {
          scaleX: 1,
        }, 'test');
      },
      onComplete: () => {
        timeline.to(this.svgRootEl, 0, {
          scaleX: -1,
        }, 'test');
      },
    }, 'test');

    this.moveBodyTimeline = timeline;
  }

  private startFootAnimationLoop(): void {
    if (this.moveFootTimeline) {
      this.moveFootTimeline.kill();
    }
    const timeline = new TimelineMax({
      repeat: -1,
      repeatDelay: 0,
      yoyo: true,
      ease: gsap.Linear.easeNone,
      paused: true,
    });

    timeline
      .add('test')
      .fromTo(this.footLeftEl, FOOT_ROTATE_TIME, {
          rotation: 0,
          svgOrigin: FOOT_LEFT_TRANSFORM_ORIGIN,
          ease: gsap.Linear.easeNone,
        }, {
          rotation: -FOOT_LEFT_ROTATE_ANGLE_DEFAULT,
          svgOrigin: FOOT_LEFT_TRANSFORM_ORIGIN,
          ease: gsap.Linear.easeNone,
        },
        'test')
      .fromTo(this.footRightEl, FOOT_ROTATE_TIME, {
        rotation: 0,
        svgOrigin: FOOT_RIGHT_TRANSFORM_ORIGIN,
        ease: gsap.Linear.easeNone,
      }, {
        rotation: FOOT_RIGHT_ROTATE_ANGLE_DEFAULT,
        svgOrigin: FOOT_RIGHT_TRANSFORM_ORIGIN,
        ease: gsap.Linear.easeNone,
      }, 'test');

    timeline.play();

    this.moveFootTimeline = timeline;
  }

  private startFootToSlideAnimation(): void {
    this.moveFootTimeline.pause();
    this.moveBodyTimeline.duration(BODY_MOVE_TIME_SLIDE);
    const timeline = new TimelineMax({

    })
      .add('test')
      .to(this.footLeftEl, FOOT_TO_SLIDE_TIME, {
          rotation: FOOT_ROTATE_ANGLE_SLIDE,
          svgOrigin: FOOT_LEFT_TRANSFORM_ORIGIN,
          ease: gsap.Linear.easeNone,
        },
        'test')
      .to(this.footRightEl, FOOT_TO_SLIDE_TIME, {
        rotation: 0,
        svgOrigin: FOOT_RIGHT_TRANSFORM_ORIGIN,
        ease: gsap.Linear.easeNone,
      }, 'test');
    this.moveFootTimeline = timeline;
  }

  private startSlideToFootAnimation(): void {
    this.moveBodyTimeline.duration(BODY_MOVE_TIME_DEFAULT);
    const timeline = new TimelineMax({
      ease: gsap.Linear.easeNone,
      paused: true,
      onComplete: () => {
        this.startFootAnimationLoop();
      },
    }).add('test');
    timeline
      .to(this.footLeftEl, FOOT_FROM_SLIDE_TIME, {
      rotation: 0,
      svgOrigin: FOOT_LEFT_TRANSFORM_ORIGIN,
      ease: gsap.Linear.easeNone,
    }, 'test')
      .to(this.footRightEl, FOOT_FROM_SLIDE_TIME, {
        rotation: 0,
        svgOrigin: FOOT_RIGHT_TRANSFORM_ORIGIN,
        ease: gsap.Linear.easeNone,
      }, 'test');
    timeline.play();
  }

  private startAnimation(): void {
    this.startMoveBodyAnimation();
    this.startFootAnimationLoop();
  }
}
