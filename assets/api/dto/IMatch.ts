interface IScore {
  et_score: string;
  ft_score: string;
  pen_score: string;
  score: string;
  uuid: string;
}

export interface IEventSport {
  uuid: string;
  url: string;
  name: string;
}

export interface IEventLeague {
  uuid: string;
  url: string;
  logo: string;
  name: string;
  use_league_logo: 'true' | 'false';
}

export interface IEventLocation {
  name: string;
  flag: string;
}

export interface IEventTeam {
  uuid: string;
  name: string;
  logo: string;
  slug: string;
  score: string;
  et_score: string;
  ft_score: string;
  pen_score: string;
}

export interface IEvent {
  uuid: string;
  start_time: number;
  end_time: number;
  status: string;
  hasParticipants: 'true' | 'false';
  event_url: string;
  event_title: string;
  match_uuid: string;
  halftime_score: string;
  title: string;
  rewrite?: boolean;
  bg_image: string;

  sport: IEventSport;
  league: IEventLeague;
  location: IEventLocation;
  participantAway: IEventTeam;
  participantHome: IEventTeam;
}

export interface IStringifyEvent {
  uuid: string;
  start_time: number;
  end_time: number;
  status: string;
  hasParticipants: 'true' | 'false';
  event_url: string;
  event_title: string;
  match_uuid: string;
  halftime_score: string;
  title: string;
  bg_image: string;

  sport: string;
  league: string;
  location: string;
  participantAway: string;
  participantHome: string;
}

export interface IMatch {
  status: string;
  sport_uuid: string;
  use_league_logo: 'true' | 'false';
  hasParticipants: 'true' | 'false';
  event_title: string;
  match_uuid: string;
  og_url: string;
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
  participantAwayScore?: string | IScore;
  participantHomeScore?: string | IScore;
  rewrite?: boolean;
  odds: string;
  sport_url: string;
  title: string;
  description: string;
  og_meta_title: string;
  og_image: string;
  og_meta_description: string;
  og_meta_keywords: string;
  location_uuid: string;
  participantHome_name: string;
  participantHome_logo: string;
  participantAway_name: string;
  participantAway_logo: string;
  participantHome_uuid: string;
  participantHome_slug: string;
  participantAway_uuid: string;
  participantAway_slug: string;
  halftime_score: string;
}

export interface ITopMatches {
  event_of_day: IMatch[];
  top_matches: IMatch[];
}

export interface IPostPage {
  league_uuid?: string;
  sport_og_url?: string;
  lang: string;
}
