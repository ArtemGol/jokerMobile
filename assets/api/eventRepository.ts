import {BaseApiService} from './baseApiService';
import type {IMatch, IPostPage, ITopMatches} from './dto/IMatch';
import type {IItem} from '../interfaces/IItem';
import type {IStream} from './dto/IStream';

class EventRepository extends BaseApiService {
  constructor() {
    super('events/');
  }

  fetchTopMatches = () => this.get<ITopMatches>('top-match-event');

  fetchAllEvents = (sport: IPostPage) =>
    this.get<string[]>(
      `v3/sorted-and-published?${
        sport.sport_og_url
          ? `sport_og_url=${sport.sport_og_url}`
          : `league_uuid=${sport.league_uuid}`
      }&lang=${sport.lang}`,
    );

  fetchLeagues = (sportOgUrl: string) =>
    this.post<IItem[]>('leagues', {sport_og_url: sportOgUrl});

  fetchEvent = (matchId: string, eventId: string) =>
    this.get<IMatch[]>(`match-event/${matchId}/${eventId}`);

  fetchStreams = (id: string) =>
    this.post<{collection: Record<string, IStream[]>}[]>('streams', {
      event_uuid: id,
    });
}

export const eventRepository = new EventRepository();
