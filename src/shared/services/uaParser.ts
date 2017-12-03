import * as UaParser from 'ua-parser-js';

let parser;
let parserResult: TUaParserResult;

type TUaParserResult = {
  browser: {
    major: string,
    name: string,
    version: string,
  },
  device: {
    model: string,
    type: string,
    vendor: string,
  },
  os: {
    name: string,
    version: string,
  },
  engine: {
    name: string,
    version: string,
  },
  cpu: {
    architecture: string | null,
  },
  isGoodPerformance: boolean,
};

export default function uaParser() {
  if (!parser) {
    parser = new UaParser();
    parserResult = {
      browser: {},
      device: {},
      os: {},
      engine: {},
      cpu: {},
      ...parser.getResult(),
    };
    parserResult.isGoodPerformance = isGoodPerformance();
  }
  return parserResult;
}

// We need this param for enabling animations
// TODO Need to think how to detect it more correctly
function isGoodPerformance(): boolean {
  const r = parserResult;
  const osVersions = (r.os.version || '').split('.');
  const osVersion = parseInt(osVersions[0], 10);
  const isBadAndroid = r.os.name === 'Android' && osVersion < 5;
  const isBadApple = r.os.name === 'iOS' && osVersion < 9;
  if (isBadApple || isBadAndroid) {
    return false;
  }
  return true;
}
