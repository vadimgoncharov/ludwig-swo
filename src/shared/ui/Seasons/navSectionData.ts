import Component from './SeasonsNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Четыре сезона',
  hash: 'four-seasons',
  img: svg,
  Component,
};

export default navSection;
