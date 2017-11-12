import Component from './JdanNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const Img = require('./navSection.png') as string;
const navSection: TUiNavSection = {
  title: 'Пятеро смелых',
  hash: 'jdan',
  img: `<img src=${Img} alt="" />`,
  Component,
};

export default navSection;
