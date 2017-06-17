import * as date from '../date';

const DECEMBER_ABBRS = [
  'ПД', 'ВД', 'ТД', 'ЧД', 'ПД', 'ШД', 'СД', 'ВД', 'ДД', 'ДД',
  'ОД', 'ДД', 'ТД', 'ЧД', 'ПД', 'ШД', 'СД', 'ВД', 'ДД', 'ДД',
  'ДПД', 'ДВД', 'ДТД', 'ДЧД', 'ДПД', 'ДШД', 'ДСД', 'ДВД', 'ДДД', 'ТД',
  'ТПД',
];

describe('date.dateToDayMonthAbbr', () => {
  test('should convert date to abbr correctly', () => {
    for (let day = 1; day <= 31; day++) {
      const year = 2017;
      const month = 12; // Dec
      const d = new Date(year, month - 1, day);

      const result = DECEMBER_ABBRS[day - 1];
      expect(date.dateToDayMonthAbbr(d)).toBe(result);
    }
  });
});
