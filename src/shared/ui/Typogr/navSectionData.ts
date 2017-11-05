import Component from './TypogrNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Типогррр',
  hash: 'typogrrr',
  img: svg,
  Component,
};

export default navSection;
