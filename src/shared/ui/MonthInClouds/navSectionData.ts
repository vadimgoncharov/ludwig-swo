import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
import Component from './MonthInCloudsNavSection';
const navSection: TUiNavSection = {
  title: 'Месяц в\u00a0облаках',
  hash: 'month-in-clouds',
  img: svg,
  Component,
};

export default navSection;
