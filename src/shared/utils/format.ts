import * as formatThousandsLib from 'format-thousands';
import * as pluralize from 'plural-ru';

function formatValueToTimes(value: number, useSuffix: boolean = true): string {
  const formatted: string = formatThousandsLib(value);

  if (useSuffix) {
    const suffix: string = pluralize(value, 'раз', 'раза', 'раз');
    return `${formatted} ${suffix}`;
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

function formatDays(value: number, useSuffix: boolean = true): string {
  if (useSuffix) {
    const suffix: string = pluralize(value, 'день', 'дня', 'дней');
    return `${value} ${suffix}`;
  }

  return value.toString();
}

export {
  formatValueToTimesWithPluralize,
  formatValueToTimesWithoutPluralize,
  formatThousands,
  formatDays,
}
