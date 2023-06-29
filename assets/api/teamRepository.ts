import {BaseApiService} from './baseApiService';
import type {ITeam} from './dto/ITeam';

class TeamRepository extends BaseApiService {
  constructor() {
    super('');
  }

  fetchTeam = (teamId: string, locale: string) =>
    this.get<ITeam[]>(`participant/${teamId}?lang=${locale}`);

  fetchTeamEvents = (
    teamId: string,
    eventType: 'feature' | 'past',
    locale: string,
  ) =>
    this.get<string[]>(
      `v2/participant/${teamId}/events/${eventType}/10?lang=${locale}`,
    );
}

export const teamRepository = new TeamRepository();
