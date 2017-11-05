import Component from './SquareNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Абсолютный квадрат',
  hash: 'square',
  img: svg,
  Component,
};

export default navSection;
