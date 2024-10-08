interface IScore {
  et_score: string;
  ft_score: string;
  pen_score: string;
  score: string;
  uuid: string;
}

export interface IEvent {
  use_league_logo: 'true' | 'false';
  hasParticipants: 'true' | 'false';
  event_title: string;
  match_uuid: string;
  sport_url: string;
  uuid: string;
  event_url: string;
  start_time: number;
  end_time: number;
  league_uuid: string;
  sport_name: string;
  league_name: string;
  league_logo: string;
  league_url: string;
  league_location_uuid: string;
  participant_1_name: string;
  participant_1_logo: string;
  participant_1_uuid: string;
  participant_2_name: string;
  participant_2_logo: string;
  participant_2_uuid: string;
  name: string;
  flag: string;
  bg_image: string;
  participantAwayScore?: IScore;
  participantHomeScore?: IScore;
  halftime_score?: string;
}

export interface ITopMatches {
  event_of_day: IEvent[];
  top_matches: IEvent[];
}

export interface IPostPage {
  league_uuid?: string;
  sport_og_url?: string;
  lang: string;
}
