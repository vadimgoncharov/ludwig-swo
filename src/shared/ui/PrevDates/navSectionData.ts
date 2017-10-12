import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
import Component from './PrevDatesNavSection';
const navSection: TUiNavSection = {
  title: 'Предыдущие дни открытия сайта',
  hash: 'prev-dates',
  img: svg,
  Component,
};

export default navSection;
