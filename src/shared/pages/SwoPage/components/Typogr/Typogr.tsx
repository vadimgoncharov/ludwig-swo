import * as React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import * as TWEEN from '@tweenjs/tween.js';
import * as onresize from 'onresize';

import SectionContent from 'shared/pages/SwoPage/containers/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT} from 'shared/constants';
import * as utils from 'shared/utils';

import navSectionData from './navSectionData';

import {TStatTotal} from 'shared/types/StatTotal';

import './Typogr.scss';

type TProps = {
  isFetching: boolean,
  statTotal: TStatTotal,
};

type TState = {
  animatorCurrValue: TAnimatorValue,
};

type TAnimatorValue = {
  time: number,
};

const CANVAS_WIDTH = 615;
const CANVAS_HEIGHT = 150;
const CANVAS_SCALE_FACTOR = 2;
const CANVAS_COLOR_WHITE = '#ffffff';
const CANVAS_COLOR_BLACK = '#000000';

export default class Typogr extends React.Component<TProps, TState> {
  public props: TProps;
  public state: TState = {
    animatorCurrValue: {
      time: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private oldDate: Date;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.time = props.statTotal.date.getTime();
    this.oldDate = props.statTotal.date;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDate = this.props.statTotal.date;
    const newDate = nextProps.statTotal.date;

    if (oldDate.getTime() === newDate.getTime()) {
      return;
    }

    this.animator.start([{time: newDate.getTime()}]);
  }

  public componentWillUnmount() {
    onresize.off(this.onResize);
  }

  public componentDidMount() {
    onresize.on(this.onResize);
    this.initCanvas();
  }

  public componentDidUpdate() {
    this.renderCanvas();
  }

  public render() {
    return (
      <section className="Typogr">
        <SectionContent animator={this.animator} navSection={navSectionData}>
          <div className="Typogr-title">{navSectionData.title}</div>
          <div className="Typogr-description">
            Весь год одним словом&nbsp;— как квинтэссенция капель и&nbsp;диакретических элементов:
          </div>
          <canvas
            className="Typogr-canvas"
            width={CANVAS_WIDTH * CANVAS_SCALE_FACTOR}
            height={CANVAS_HEIGHT * CANVAS_SCALE_FACTOR}
            ref={this.onCanvasRefSet}
          />
        </SectionContent>
      </section>
    );
  }

  private initCanvas() {
    const {canvas} = this;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'top';
    ctx.font = '120px Times New Roman';
    ctx.scale(CANVAS_SCALE_FACTOR, CANVAS_SCALE_FACTOR);
    this.recalculateCanvasSize();
    this.ctx = ctx;
    this.renderWholeYearAtCanvas();
    this.renderCanvas(CANVAS_COLOR_WHITE);
    this.renderCanvas(CANVAS_COLOR_BLACK);
  }

  private recalculateCanvasSize() {
    const {canvas} = this;
    if (!canvas) {
      return;
    }
    const canvasSizeFactor = window.innerWidth >= CANVAS_WIDTH + 30
      ? CANVAS_SCALE_FACTOR
      : CANVAS_SCALE_FACTOR * 2;
    canvas.style.width = `${canvas.width / canvasSizeFactor}px`;
    canvas.style.height = `${canvas.height / canvasSizeFactor}px`;
  }

  private onResize = () => {
    this.recalculateCanvasSize();
  };

  private renderWholeYearAtCanvas() {
    const {ctx} = this;

    const firstDayDate = new Date();
    const lastDayDate = new Date();
    firstDayDate.setMonth(0, 1);
    lastDayDate.setMonth(11, 31);
    const cursor = new Date(firstDayDate);
    while (cursor.getFullYear() === firstDayDate.getFullYear()) {
      const words = utils.date.dateToDayMonthAccusative(cursor);
      // ctx.fillText(words, 15 + getRandomInt(-15, 15), getRandomInt(-5, 5));
      ctx.fillText(words, 0, 0);
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  private renderCanvas(fillStyle?: string) {
    const {canvas, ctx} = this;
    if (!canvas) {
      return;
    }
    const date: string = utils.date.dateToDayMonthAccusative(new Date(this.state.animatorCurrValue.time));
    const deltaTime = Math.abs(this.props.statTotal.date.getTime() - this.state.animatorCurrValue.time);
    const deltaDays = deltaTime / (3600 * 24 * 1000);

    const deltaDaysBound = 5;
    const alpha = utils.math.convertRange(deltaDays, 0, deltaDaysBound, 0.15, 0.1, true);
    ctx.save();
    if (fillStyle) {
      ctx.globalAlpha = 0.2;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = fillStyle;
      ctx.fillText(date, 0, 0);
    } else {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = CANVAS_COLOR_WHITE;
      const randomDeltaX = 10;
      const randomDeltaY = 5;
      if (deltaDays > deltaDaysBound) {
        ctx.globalCompositeOperation = 'source-over';
      } else {
        ctx.globalCompositeOperation = 'xor';
      }
      // ctx.fillStyle = getRandomInt(0, 4) === 0 ? '#000000' : '#ffffff';

      ctx.fillText(
        date,
        randomDeltaX + utils.random.getRandomInt(-randomDeltaX, randomDeltaX),
        randomDeltaY + utils.random.getRandomInt(-randomDeltaY, randomDeltaY),
      );
    }
    ctx.restore();
  }

  private onCanvasRefSet = (canvasEl) => {
    this.canvas = canvasEl;
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{time: this.state.animatorCurrValue.time}],
      duration: ANIMATION_DURATION_DEFAULT / 2,
      easing: TWEEN.Easing.Cubic.Out,
      comparator: (oldValues, newValues) => {
        return (
          utils.date.dateToYYYYMMDD(new Date(oldValues[0].time)) !==
          utils.date.dateToYYYYMMDD(new Date(newValues[0].time)));
      },
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
      onComplete: () => {
        // this.renderCanvas(CANVAS_COLOR_BLACK);
      },
    });
  }
}
