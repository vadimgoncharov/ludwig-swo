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

function convertRangeLog(position, minp, maxp, minv, maxv) {
  minv = Math.log(minv);
  maxv = Math.log(maxv);
  const scale = (maxv - minv) / (maxp - minp);

  return Math.exp(minv + scale * (position - minp));
}

function isEven(num: number): boolean {
  return Math.round(num) % 2 === 0;
}

const primeNumberCache = {};
function isPrimeNumber(num: number): boolean {
  if (typeof primeNumberCache[num] !== 'undefined') {
    return primeNumberCache[num];
  }
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) {
      primeNumberCache[num] = false;
      return false;
    }
  }
  primeNumberCache[num] = num !== 1;
  return primeNumberCache[num];
}

function angleToRad(angle: number): number {
  return angle * Math.PI / 180;
}

export {
  convertRange,
  convertRangeLog,
  isEven,
  isPrimeNumber,
  angleToRad,
};
