import {TUiNavSection} from 'shared/types/UiNavSection';
const png = require('./navSection.png') as string;
const navSection: TUiNavSection = {
  title: 'Орел и\u00a0решка',
  hash: 'even-odd',
  img: `<img src=${png} alt="" />`,
};

export default navSection;
