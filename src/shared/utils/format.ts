import * as formatThousandsLib from 'format-thousands';
import * as pluralize from 'plural-ru';

function formatValueToTimes(value: number, useSuffix: boolean = true): string {
  const formatted: string = formatThousandsLib(Math.round(value));

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

function caplitalizeFirstLetter(value: string): string {
  return value[0].toUpperCase() + value.slice(1);
}

export {
  formatValueToTimesWithPluralize,
  formatValueToTimesWithoutPluralize,
  formatThousands,
  formatDays,
  caplitalizeFirstLetter,
}
