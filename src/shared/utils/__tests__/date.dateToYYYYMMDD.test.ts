import * as date from '../date';

describe('date.dateToYYYYMMDD', () => {
  test('should show month number correctly', () => {
    const year = 2017;
    const month = 12; // Dec
    const day = 10;
    const d = new Date(year, month - 1, day);

    const result = `${year}-${month}-${day}`;

    expect(date.dateToYYYYMMDD(d)).toBe(result);
  });

  test('should add leading zero to day and month', () => {
    const year = 2017;
    const month = 1; // Jan
    const day = 1;
    const result = `${year}-0${month}-0${day}`;

    const d = new Date(year, month - 1, day);

    expect(date.dateToYYYYMMDD(d)).toBe(result);
  });
});
