import * as TWEEN from '@tweenjs/tween.js';
import Animator from './Animator';
import {convertRange} from 'shared/utils/math';
import * as throttle from 'lodash.throttle';

const CANVAS_SIZE = 16;
const CANVAS_SCALE_FACTOR = 2;
const CANVAS_BG_COLOR = '#F00';
const CANVAS_FONT_COLOR = '#FFFFFF';
const CANVAS_FONT_SIZE = 12;
const CANVAS_FONT_SIZE_OFFSET_Y = CANVAS_SIZE - 4;
const CANVAS_FONT_FAMILY = 'Times New Roman';

type TAnimatorValue = {
  dayIndex: number,
};

export default class FaviconRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private favicon: HTMLLinkElement;
  private currDayIndex: number;
  private prevDayIndex: number;
  private animator: Animator<TAnimatorValue>;

  constructor() {
    this.animator = this.createAnimator();
    this.animator.enableAnimation();
    this.currDayIndex = -1;
    this.prevDayIndex = 0;
    this.initCanvas();
    this.renderCanvas = throttle(this.renderCanvas, 100);
  }

  public render(date: Date, useAnimation: boolean = true): void {
    const dayIndex = date.getDate() - 1;
    if (this.currDayIndex === dayIndex) {
      return;
    }
    this.prevDayIndex = this.currDayIndex;
    this.currDayIndex = dayIndex;

    if (useAnimation) {
      this.animator.enableAnimation();
    } else {
      this.animator.disableAnimation();
    }
    this.animator.start([{dayIndex}]);
  }

  private renderCanvas(floatDayIndex: number) {
    const {ctx, favicon, canvas, currDayIndex, prevDayIndex} = this;

    let yOffset;
    if (currDayIndex > prevDayIndex) {
      yOffset = convertRange(floatDayIndex, prevDayIndex, currDayIndex, 0, CANVAS_SIZE);
    } else {
      yOffset = convertRange(floatDayIndex, currDayIndex, prevDayIndex, CANVAS_SIZE, 0);
    }

    ctx.fillStyle = CANVAS_BG_COLOR;
    ctx.fillRect(0, 0, CANVAS_SIZE * CANVAS_SCALE_FACTOR, CANVAS_SIZE * CANVAS_SCALE_FACTOR);
    ctx.fillStyle = CANVAS_FONT_COLOR;

    [prevDayIndex, currDayIndex].forEach((intDayIndex: number, loopIndex: number) => {
      const text = (intDayIndex + 1).toString();
      const dimensions = ctx.measureText(text);
      const x = (CANVAS_SIZE - dimensions.width) / 2;
      const y = CANVAS_FONT_SIZE_OFFSET_Y - yOffset + (CANVAS_SIZE * loopIndex);
      ctx.fillText(text, x, y);
    });

    favicon.href = canvas.toDataURL('image/x-icon');
    // const newIcon = favicon.cloneNode(true);
    // newIcon.setAttribute('href', canvas.toDataURL('image/x-icon'));
    // this.favicon.parentNode.replaceChild(newIcon, this.favicon);
    // this.favicon = newIcon;
    // http://www.p01.org/defender_of_the_favicon/
  }

  private initCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = CANVAS_SIZE * CANVAS_SCALE_FACTOR;
    canvas.height = CANVAS_SIZE * CANVAS_SCALE_FACTOR;

    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.scale(CANVAS_SCALE_FACTOR, CANVAS_SCALE_FACTOR);
    ctx.font = `${CANVAS_FONT_SIZE}px ${CANVAS_FONT_FAMILY}`;

    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    document.getElementsByTagName('head')[0].appendChild(link);

    this.canvas = canvas;
    this.ctx = ctx;
    this.favicon = link;
  }

  private createAnimator(): Animator<TAnimatorValue> {
    return new Animator<TAnimatorValue>({
      from: [{dayIndex: 0}],
      duration: 700,
      easing: TWEEN.Easing.Quadratic.InOut,
      comparator: (oldValues, newValues) => {
        return oldValues[0].dayIndex !== newValues[0].dayIndex;
      },
      onValueChange: (newValues) => this.renderCanvas(newValues[0].dayIndex),
    });
  }
}
