import * as c from 'shared/constants';

type TReachGoal = (goalId: string, params?: object, callback?: () => void, ctx?: object) => void;
type TYaCounter = {
  reachGoal: TReachGoal,
};

function getYaCounter(): TYaCounter | null {
  const id = c.analytics.YANDEX_METRIKA_COUNTER_ID;
  const yaCounterName = `yaCounter${id}`;
  const yaCounter = (window as any)[yaCounterName];
  return yaCounter ? yaCounter : null;
}

function reachYaGoal(goalId: string, params?: object, callback?: () => void, ctx?: object): void {
  const yaCounter = getYaCounter();
  if (!yaCounter) {
    return;
  }
  yaCounter.reachGoal(goalId, params, callback, ctx);
}

export default {
  reachYaGoal,
};
