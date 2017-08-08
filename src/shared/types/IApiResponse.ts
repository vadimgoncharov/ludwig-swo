export interface IApiResponse {
  rand_date: {
    month: number,
    day: number,
    as_str: string,
  },
  lang: { // 3 items
    ru: number,
    en: number,
    total: number,
  },
  launch: Array<{ // 366 items
    day_of_year: number,
    day: number,
    month: number,
    counter: number,
    week_of_year: number,
  }>,
  top: Array<{ // 5 items
    day_of_year: number,
    day: number,
    month: number,
    counter: number,
    week_of_year: number,
  }>,
  shame: Array<{ // 5 items
    day_of_year: number,
    day: number,
    month: number,
    counter: number,
    week_of_year: number,
  }>,
  tvTower: { // 224 items
    [key: string]: {
      date: string, // "6-12,6-1"
      is_prime: number,
    },
  },
  aroundToday: { // 3 items
    yesterday: number,
    today: number,
    tomorrow: number,
  },
  oddEven: { // 2 items
    even: number,
    odd: number,
  },
  months: { // 12
    [key: string]: {
      days: {
        [key: string]: {
          counter: number,
          day_of_year: number,
          week_of_year: number,
        },
      },
      min: number,
      max: number,
      avg: number,
      sum: number,
    },
  },
  weeks: Array<{ // 53 items, no min/max/avg/sum for 29, need to fix
    days: {
      [key: string]: {
        counter: number,
        day_of_year: number,
        week_of_year: number,
      },
    },
    min?: number,
    max?: number,
    avg?: number,
    sum?: number,
  }>,
  days: Array<{ // 31 items
    day: number,
    min: number,
    max: number,
    avg: number,
    sum: number,
  }>,
  lastSeen: Array<{ // 30 items
    day: number,
    month: number,
  }>,
}
