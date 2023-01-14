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
  participant_2_name: string;
  participant_2_logo: string;
  name: string;
  flag: string;
  bg_image: string;
}

export interface ITopMatches {
  event_of_day: IEvent[];
  top_matches: IEvent[];
}

export interface IPostPage {
  league_uuid?: string;
  sport_og_url?: string;
}
