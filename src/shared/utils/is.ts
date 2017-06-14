function isObject(value: any): boolean {
  return ({}).toString.call(value) === '[object Object]';
}

function isArray(value: any): boolean {
  return Array.isArray(value);
}

export {
  isArray,
  isObject,
};
