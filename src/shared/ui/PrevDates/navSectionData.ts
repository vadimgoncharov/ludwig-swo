import {TUiNavSection} from 'shared/types/UiNavSection';
const svg = require('./navSection.svg') as string;
const navSection: TUiNavSection = {
  title: 'Предыдущие дни открытия сайта',
  hash: 'prev-dates',
  img: svg,
};

export default navSection;
