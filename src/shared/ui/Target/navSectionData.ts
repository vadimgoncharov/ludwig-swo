import {TUiNavSection} from 'shared/types/UiNavSection';
import Component from './TargetNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Целевая аудитория',
  hash: 'target',
  img: svg,
  Component,
};

export default navSection;
