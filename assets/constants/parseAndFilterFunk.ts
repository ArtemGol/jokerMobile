import type {IEvent, IStringifyEvent} from '../api/dto/IMatch';

export const parseAndFilterFunk = (res: string[], past?: boolean) =>
  res
    .map(el => {
      const parseEl: IStringifyEvent = JSON.parse(el);
      const parseAllPropElem: IEvent = {
        ...parseEl,
        sport: JSON.parse(parseEl.sport || ''),
        league: JSON.parse(parseEl.league || ''),
        location: JSON.parse(parseEl.location || ''),
        participantHome: JSON.parse(parseEl.participantHome || ''),
        participantAway: JSON.parse(parseEl.participantAway || ''),
      };
      return parseAllPropElem;
    })
    .filter(filter =>
      past ? true : new Date(filter.end_time * 1000).getTime() > Date.now(),
    );
