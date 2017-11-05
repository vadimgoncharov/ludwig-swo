import Component from './DayInYearScaleNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'День в\u00a0году',
  hash: 'day-in-year',
  img: svg,
  Component,
};

export default navSection;
