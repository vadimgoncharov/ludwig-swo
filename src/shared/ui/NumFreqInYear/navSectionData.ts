import {TUiNavSection} from 'shared/types/UiNavSection';
import Component from './NumFreqInYearNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Частокол',
  hash: 'chastokol',
  img: svg,
  Component,
};

export default navSection;
