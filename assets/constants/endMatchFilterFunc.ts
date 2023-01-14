import type {IEvent} from '../api/dto/IEvent';

export const endMatchFilterFunc = (filterEvents: IEvent[]) =>
  filterEvents.filter(
    filter => new Date(filter.end_time * 1000).getTime() > Date.now(),
  );
