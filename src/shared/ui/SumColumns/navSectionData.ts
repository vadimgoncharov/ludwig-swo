import Component from './SumColumnsNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Месячный абонемент',
  hash: 'season-ticket',
  img: svg,
  Component,
};

export default navSection;
