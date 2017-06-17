import * as formatThousandsLib from 'format-thousands';
import * as pluralize from 'plural-ru';

function formatValueToTimes(value: number, usePostfix: boolean = true): string {
  const formatted: string = formatThousandsLib(value);

  if (usePostfix) {
    const postfix: string = pluralize(value, 'раз', 'раза', 'раз');
    return `${formatted} ${postfix}`;
  }

  return `${formatted} раза`;
}

function formatValueToTimesWithPluralize(value: number): string {
  return formatValueToTimes(value, true);
}

function formatValueToTimesWithoutPluralize(value: number): string {
  return formatValueToTimes(value, false);
}

function formatThousands(value: number): string {
  return formatThousandsLib(value) as string;
}

export {
  formatValueToTimesWithPluralize,
  formatValueToTimesWithoutPluralize,
  formatThousands,
}
