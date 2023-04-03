import {BaseApiService} from './baseApiService';
import type {IEvent, IPostPage, ITopMatches} from './dto/IEvent';
import type {IItem} from '../interfaces/IItem';
import type {IStream} from './dto/IStream';

class EventRepository extends BaseApiService {
  constructor() {
    super('events/');
  }

  fetchTopMatches = () => this.get<ITopMatches>('top-match-event');

  fetchAllEvents = (sport: IPostPage) =>
    this.post<{data: IEvent[]}[]>('sorted-and-published', sport);

  fetchLeagues = (sportOgUrl: string) =>
    this.post<IItem[]>('leagues', {sport_og_url: sportOgUrl});

  fetchEvent = (matchId: string, eventId: string) =>
    this.get<IEvent[]>(`match-event/${matchId}/${eventId}`);

  fetchStreams = (id: string) =>
    this.post<{collection: Record<string, IStream[]>}[]>('streams', {
      event_uuid: id,
    });
}

export const eventRepository = new EventRepository();
