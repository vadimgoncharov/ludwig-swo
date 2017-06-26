import {TStatValueAtDate} from './StatValueAtDate';

export type TStatAround = {
  yesterday: TStatValueAtDate,
  today: TStatValueAtDate,
  tomorrow: TStatValueAtDate,
};
