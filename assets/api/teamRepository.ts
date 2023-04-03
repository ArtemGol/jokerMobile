import {BaseApiService} from './baseApiService';
import type {ITeam} from './dto/ITeam';
import type {IEvent} from './dto/IEvent';

class TeamRepository extends BaseApiService {
  constructor() {
    super('participant/');
  }

  fetchTeam = (teamId: string, locale: string) =>
    this.get<ITeam[]>(`${teamId}?lang=${locale}`);

  fetchTeamEvents = (
    teamId: string,
    eventType: 'feature' | 'past',
    locale: string,
  ) =>
    this.get<{events: IEvent[]}>(
      `${teamId}/events/${eventType}/10?lang=${locale}`,
    );
}

export const teamRepository = new TeamRepository();
