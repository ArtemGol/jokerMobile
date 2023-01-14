import {IEvent} from '../api/dto/IEvent';

export const sortEventsByDataFunc = (sortArray: IEvent[]) =>
  sortArray.sort(
    (a, b) =>
      new Date(a.start_time * 1000).getTime() -
      new Date(b.start_time * 1000).getTime(),
  );
