import i18n from 'i18next';

export const formatDate = (
  date: string | Date | undefined,
  formatString: string,
) => {
  if (date) {
    const newDate = new Date(date);
    if (newDate.getDate()) {
      i18n.t(`monthList.default.${newDate.getMonth()}`);
      return formatString
        .replace('dd', String(newDate.getDate()))
        .replace('DD', daysInTimer(Math.floor(newDate.getTime() / 86400000)))
        .replace('MMMM', i18n.t(`monthList.default.${newDate.getMonth()}`))
        .replace('MMM', i18n.t(`monthList.short.${newDate.getMonth()}`))
        .replace('MM', padZero(newDate.getMonth() + 1))
        .replace('yyyy', String(newDate.getFullYear()))
        .replace('yyy', String(newDate.getFullYear()).slice(2, 4))
        .replace('HH', padZero(newDate.getHours()))
        .replace(
          'hhh',
          String(padZero(Math.floor(+newDate / (1000 * 60 * 60)))),
        )
        .replace('mm', padZero(newDate.getMinutes()))
        .replace('ss', padZero(newDate.getSeconds()))
        .replace('ww', getDayOfWeek(+padZero(newDate.getDay()), 'dayOfWeek'))
        .replace(
          'WW',
          getDayOfWeek(+padZero(newDate.getDay()), 'dayOfWeekFull'),
        );
    }
    return 'invalid date';
  }
  return 'invalid date';
};

const padZero = (n: number): string => (n < 10 ? `0${n}` : String(n));

const daysInTimer = (n: number) =>
  i18n.t('matchPage.afterCountDays', {count: n});

export const getDayOfWeek = (
  number: number,
  searchStr: 'dayOfWeek' | 'dayOfWeekFull',
) => {
  switch (number) {
    case 0o0:
      return i18n.t(`monthList.${searchStr}.6`);
    case 0o1:
      return i18n.t(`monthList.${searchStr}.0`);
    case 0o2:
      return i18n.t(`monthList.${searchStr}.1`);
    case 0o3:
      return i18n.t(`monthList.${searchStr}.2`);
    case 0o4:
      return i18n.t(`monthList.${searchStr}.3`);
    case 0o5:
      return i18n.t(`monthList.${searchStr}.4`);
    case 0o6:
      return i18n.t(`monthList.${searchStr}.5`);
    default:
      return 'Validation Error';
  }
};
