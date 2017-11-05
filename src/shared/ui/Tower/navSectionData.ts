import Component from './TowerNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Телебашня',
  hash: 'tower',
  img: svg,
  Component,
};

export default navSection;
