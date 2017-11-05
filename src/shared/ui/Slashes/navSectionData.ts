import Component from './SlashesNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Фольксваген',
  hash: 'volkswagen',
  img: svg,
  Component,
};

export default navSection;
