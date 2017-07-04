function convertRange(
  oldValue: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  isRoundByInterval: boolean = true): number {
  if (isRoundByInterval) {
    oldValue = Math.max(oldValue, oldMin);
    oldValue = Math.min(oldValue, oldMax);
  }
  const oldRange = (oldMax - oldMin);
  let newValue;
  let newRange;
  if (oldRange === 0) {
    newValue = newMin;
  } else {
    newRange = (newMax - newMin);
    newValue = (((oldValue - oldMin) * newRange) / oldRange) + newMin
  }
  return newValue;
}

function isEven(num: number): boolean {
  return Math.round(num) % 2 === 0;
}

function isPrimeNumber(num: number): boolean {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return num !== 1;
}

export {
  convertRange,
  isEven,
  isPrimeNumber,
};
