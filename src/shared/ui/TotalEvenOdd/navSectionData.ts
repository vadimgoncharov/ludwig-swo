import Component from './TotalEvenOddNavSection';
import {TUiNavSection} from 'shared/types/UiNavSection';
const Img = require('./navSectionReshka.jpg') as string;
const navSection: TUiNavSection = {
  title: 'Орел и\u00a0решка',
  hash: 'even-odd',
  img: `<img src=${Img} alt="" />`,
  Component,
};

export default navSection;
