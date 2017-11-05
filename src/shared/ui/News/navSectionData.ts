import Component from './NewsNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Новости',
  hash: 'news',
  img: svg,
  Component,
};

export default navSection;
