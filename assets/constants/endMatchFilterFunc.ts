import type {IEvent} from '../api/dto/IMatch';

export const endMatchFilterFunc = (filterEvents: IEvent[]) =>
  filterEvents.filter(
    filter => new Date(filter.end_time * 1000).getTime() > Date.now(),
  );
