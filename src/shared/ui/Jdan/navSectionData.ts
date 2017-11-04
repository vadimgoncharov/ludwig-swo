import {TUiNavSection} from 'shared/types/UiNavSection';
const png = require('./navSection.png') as string;
const navSection: TUiNavSection = {
  title: 'Пятеро смелых',
  hash: 'jdan',
  img: `<img src=${png} alt="" />`,
};

export default navSection;
