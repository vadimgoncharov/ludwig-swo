import {TNewsItem} from './News';
const NEWS_ITEMS: TNewsItem[] = [
  {
    content: `Сайт переехал на\u00a0новый хостинг и\u00a0в\u00a0первый раз откроется 17 ноября.
    Сейчас пока\u00a0что контента маловато, но\u00a0работа идет!!!`,
    date: new Date(2006, 10 - 1, 1),
  },
  {
    content: '«Новости»',
    date: new Date(2006, 10 - 1, 1),
  },
  {
    content: 'Сайт оптимизирован под «Файрфокс»',
    date: new Date(2006, 10 - 1, 13),
  },
  {
    content: '«Четыре сезона»',
    date: new Date(2006, 10 - 1, 26),
  },
  {
    content: '«Кто не\u00a0в\u00a0курсе», «День зарплаты», «Этот день в\u00a0году», «Частокол»',
    date: new Date(2006, 10 - 1, 27),
  },
  {
    content: '«50 на 50»',
    date: new Date(2006, 10 - 1, 28),
  },
  {
    content: '«Чет/нечет»',
    date: new Date(2006, 10 - 1, 29),
  },
  {
    content: 'Квадратная лупа',
    date: new Date(2006, 10 - 1, 30),
  },
  {
    content: '«Косые». Идея украдена у\u00a0Юры\u00a0Швецова',
    date: new Date(2006, 11 - 1, 8),
  },
  {
    content: '«Абсолютный квадрат», «Фольксваген», «Беныльдык» и «Уточки Фёдорова» (на\u00a0правах рекламы)',
    date: new Date(2006, 11 - 1, 9),
  },
  {
    content: '«Простые числа»',
    date: new Date(2006, 11 - 1, 9),
  },
  {
    content: '«Простые числа»',
    date: new Date(2006, 11 - 1, 18),
  },
  {
    content: '«Двадцать одно»',
    date: new Date(2006, 11 - 1, 21),
  },
  {
    content: '«Коротко»',
    date: new Date(2006, 12 - 1, 19),
  },
  {
    content: '«Скользкая дорожка»',
    date: new Date(2006, 12 - 1, 22),
  },
  {
    content: '«Пятеро смелых»',
    date: new Date(2006, 12 - 1, 26),
  },
  {
    content: '«Разобранная Мона\u00a0Лиза»',
    date: new Date(2006, 12 - 1, 27),
  },
  {
    content: '«Краткое отражение»',
    date: new Date(2007, 1 - 1, 24),
  },
  {
    content: '«Целевая аудитория»',
    date: new Date(2007, 1 - 1, 24),
  },
  {
    content: '«Типогрр»',
    date: new Date(2007, 1 - 1, 24),
  },
  {
    content: '«Некоторые любят погорячее»',
    date: new Date(2007, 1 - 1, 25),
  },
  {
    content: '«Телебашня»',
    date: new Date(2007, 1 - 1, 26),
  },
  {
    content: '«0,123456789»',
    date: new Date(2007, 1 - 1, 29),
  },
  {
    content: '«Слот-машина»',
    date: new Date(2007, 2 - 1, 1),
  },
  {
    content: 'Версия\u00a02',
    date: new Date(2007, 10 - 1, 5),
  },
  {
    content: 'Открыта третья версия',
    date: new Date(2015, 10 - 1, 20),
  },
  {
    content: 'Галлюцинирующий Ждан',
    date: new Date(2015, 10 - 1, 20),
  },
  {
    content: 'Открыта четвертая версия сайта: добавлен интерактив и\u00a0версия для\u00a0мобильников',
    date: new Date(2017, 8 - 1, 26),
  },
].sort((a, b) => b.date.getTime() - a.date.getTime());

export default NEWS_ITEMS;
