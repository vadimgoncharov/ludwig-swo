import Component from './DayInMonthHistogramNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Гистограмма',
  hash: 'histogram',
  img: svg,
  Component,
};

export default navSection;
