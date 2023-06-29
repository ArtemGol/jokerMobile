import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import type {IEvent, IMatch} from '../../../assets/api/dto/IMatch';
import {formatDate} from '../../../assets/constants/date';
import {isLiveFunc} from '../../../assets/constants/isLiveFunc';
import {CustomImage} from '../customImage/customImage';
import {useTranslation} from 'react-i18next';
import {useContext} from 'react';
import {InitialStateContext} from '../../../App';
import {useNavigation} from '@react-navigation/native';

const TeamBlock = ({teamLogo}: {teamLogo: string}) => (
  <View style={styles.teamBlock}>
    <CustomImage
      src={teamLogo}
      imageStyles={styles.teamImage}
      mockImg={require('../../../assets/images/mockLogos/noTeam.png')}
    />
  </View>
);

interface IProps {
  event: IMatch;
  last: boolean;
}

export const TopMatchItem = ({event, last}: IProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {differanceTimeZoneInMs} = useContext(InitialStateContext);
  const isLive = isLiveFunc(event.start_time, event.end_time);
  const newEvent: IEvent = {
    uuid: event.uuid,
    start_time: event.start_time,
    end_time: event.end_time,
    status: event.status,
    hasParticipants: event.hasParticipants,
    event_url: event.event_url,
    event_title: event.event_title,
    match_uuid: event.match_uuid,
    halftime_score: event.halftime_score,
    title: event.title,
    bg_image: event.bg_image,
    sport: {
      uuid: event.sport_uuid,
      url: event.sport_url,
      name: event.sport_name,
    },
    league: {
      uuid: event.league_uuid,
      url: event.league_url,
      logo: event.league_logo,
      name: event.league_name,
      use_league_logo: event.use_league_logo,
    },
    location: {
      name: event.name,
      flag: event.flag,
    },
    participantHome: {
      uuid: event.participantHome_uuid,
      name: event.participant_1_name,
      logo: event.participant_1_logo,
      slug: event.participantHome_slug,
      score: '',
      et_score: '',
      ft_score: '',
      pen_score: '',
    },
    participantAway: {
      uuid: event.participantAway_uuid,
      name: event.participant_2_name,
      logo: event.participant_2_logo,
      slug: event.participantAway_slug,
      score: '',
      et_score: '',
      ft_score: '',
      pen_score: '',
    },
  };

  return (
    <ImageBackground
      resizeMode="cover"
      imageStyle={{borderRadius: 8, width: 190}}
      source={{
        uri: `https://assets.jokerlivestream.vip/${event.bg_image}`,
      }}
      style={last ? {} : {marginRight: 10}}>
      <TouchableOpacity
        onPress={() =>
          navigation
            .getParent()
            ?.navigate('Match', {title: 'About Match', item: newEvent})
        }
        activeOpacity={0.8}
        style={[
          styles.container,
          isLive && {borderWidth: 2, borderColor: colors.violet},
        ]}>
        <View style={styles.leagueBlock}>
          <CustomImage
            src={event.league_logo}
            imageStyles={styles.leagueImage}
            mockImg={require('../../../assets/images/mockLogos/noLeague.png')}
          />
          <Text numberOfLines={1} style={styles.leagueText}>
            {event.league_name}
          </Text>
        </View>
        <View style={styles.teamsBlock}>
          <TeamBlock teamLogo={event.participant_1_logo} />
          <Text
            style={[
              {
                color: colors.white,
                fontSize: 10,
                fontFamily: 'Rubik-Bold',
                textTransform: 'uppercase',
              },
            ]}>
            {t('matchesPage.vs')}
          </Text>
          <TeamBlock teamLogo={event.participant_2_logo} />
        </View>
        <View
          style={[
            styles.dateBlock,
            {backgroundColor: isLive ? colors.violet : colors.blackOpacity},
          ]}>
          {isLive ? (
            <>
              <View
                style={[
                  {
                    width: 5,
                    height: 5,
                    backgroundColor: colors.white,
                    borderRadius: 100,
                  },
                ]}
              />
              <Text
                style={[
                  styles.dateText,
                  {fontFamily: 'Rubik-Bold', marginLeft: 5},
                ]}>
                {t('matchesPage.live')}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.dateText}>
                {formatDate(
                  new Date(event.start_time * 1000 + differanceTimeZoneInMs),
                  'dd MMMM',
                )}
                ,
              </Text>
              <Text
                style={[
                  styles.dateText,
                  {fontFamily: 'Rubik-Bold', marginLeft: 5},
                ]}>
                {formatDate(
                  new Date(event.start_time * 1000 + differanceTimeZoneInMs),
                  'HH:mm',
                )}
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 160,
    backgroundColor: colors.blackOpacity,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leagueBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  leagueText: {
    color: colors.white,
    maxWidth: 120,
    fontSize: 10,
  },
  teamsBlock: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  teamImage: {
    width: 32,
    height: 32,
  },
  textPlug: {
    height: 15,
    width: 50,
    backgroundColor: colors.blue.DEFAULT,
  },
  dateBlock: {
    backgroundColor: colors.blackOpacity,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  dateText: {
    color: colors.white,
    fontSize: 10,
  },
});
