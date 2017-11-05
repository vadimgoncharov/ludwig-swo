import Component from './YearGradientNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Некоторые любят погорячее',
  hash: 'gradient',
  img: svg,
  Component,
};

export default navSection;
