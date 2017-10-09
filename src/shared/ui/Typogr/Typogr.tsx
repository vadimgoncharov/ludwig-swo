import * as React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import * as TWEEN from '@tweenjs/tween.js';
import * as onresize from 'onresize';
import SectionContent from 'shared/ui/SectionContent';
import Animator from 'shared/services/Animator';
import {ANIMATION_DURATION_DEFAULT, DAYS_IN_YEAR} from 'shared/constants';
import {dayNumToDayMonthAccusative} from 'shared/utils/date';
import {convertRange} from 'shared/utils/math';
import {getRandomInt} from 'shared/utils/random';
import navSectionData from './navSectionData';
import './Typogr.scss';

import {TTotal} from 'shared/types/Total';

type TProps = {
  total: TTotal,
};
type TState = {
  animatorCurrValue: TAnimatorValue,
};
type TAnimatorValue = {
  dayNum: number,
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
      dayNum: 0,
    },
  };
  private animator: Animator<TAnimatorValue>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private oldDate: number;

  constructor(props: TProps) {
    super(props);

    this.state.animatorCurrValue.dayNum = props.total.dayNum;
    this.oldDate = props.total.dayNum;
    this.animator = this.createAnimator();
  }

  public componentWillReceiveProps(nextProps: TProps) {
    const oldDayNum = this.props.total.dayNum;
    const newDayNum = nextProps.total.dayNum;

    if (oldDayNum === newDayNum) {
      return;
    }

    this.animator.start([{dayNum: newDayNum}]);
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

    for (let dayNum = 0; dayNum < DAYS_IN_YEAR; dayNum++) {
      const words = dayNumToDayMonthAccusative(dayNum);
      ctx.fillText(words, 0, 0);
    }
  }

  private renderCanvas(fillStyle?: string) {
    const {canvas, ctx} = this;
    if (!canvas) {
      return;
    }
    const date: string = dayNumToDayMonthAccusative(Math.round(this.state.animatorCurrValue.dayNum));
    const deltaDays = Math.abs(this.props.total.dayNum - Math.round(this.state.animatorCurrValue.dayNum));

    const deltaDaysBound = 1;
    const alpha = convertRange(deltaDays, 0, deltaDaysBound, 0.15, 0.2, true);
    ctx.save();
    if (fillStyle) {
      ctx.globalAlpha = 0.5;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = fillStyle;
      ctx.fillText(date, 0, 0);
    } else {
      ctx.globalAlpha = alpha;
      const randomDeltaX = 3;
      const randomDeltaY = 3;
      if (deltaDays > deltaDaysBound) {
        ctx.globalCompositeOperation = 'source-over';
      } else {
        ctx.globalCompositeOperation = 'xor';
      }

      ctx.fillText(
        date,
        randomDeltaX + getRandomInt(-randomDeltaX, randomDeltaX),
        randomDeltaY + getRandomInt(-randomDeltaY, randomDeltaY),
      );
    }
    ctx.restore();
  }

  private onCanvasRefSet = (canvasEl) => {
    this.canvas = canvasEl;
  };

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{dayNum: this.state.animatorCurrValue.dayNum}],
      duration: ANIMATION_DURATION_DEFAULT / 3,
      easing: TWEEN.Easing.Cubic.Out,
      comparator: (oldValues, newValues) => oldValues[0].dayNum !== newValues[0].dayNum,
      onValueChange: (newValues) => this.setState({animatorCurrValue: newValues[0]}),
    });
  }
}
