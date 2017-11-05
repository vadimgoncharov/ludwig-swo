import Component from './AroundNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Вчера, сегодня, завтра',
  hash: 'around',
  img: svg,
  Component,
};

export default navSection;
