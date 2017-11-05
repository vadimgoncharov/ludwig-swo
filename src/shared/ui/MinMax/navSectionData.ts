import {TUiNavSection} from 'shared/types/UiNavSection';
import Component from './MinMaxNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'ТОП-5 и\u00a0позор микрорайона',
  hash: 'top5',
  img: svg,
  Component,
};

export default navSection;
