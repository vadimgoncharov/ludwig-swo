import Component from './CurrDayAbbrNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Коротко',
  hash: 'abbr',
  img: svg,
  Component,
};

export default navSection;
