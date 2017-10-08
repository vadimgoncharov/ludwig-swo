import _navSections from './navSections';
import _monthColors from './monthColors';
import * as _dayNumMapping from './dayNumMapping';
import * as _dateStrings from './dateStrings';
import * as _seasons from './seasons';

export const ANIMATION_DURATION_DEFAULT = 3000;
export const navSections = _navSections;
export const monthColors = _monthColors;

export const dayNumMapping = _dayNumMapping;
export const dateStrings = _dateStrings;
export const seasons = _seasons;

export const DAYS_IN_YEAR = _dayNumMapping.dayNumToDateData.length;
export const DAY_NUM_LAST_IN_YEAR = DAYS_IN_YEAR - 1;
export const DAY_NUM_FIRST_IN_YEAR = 0;
