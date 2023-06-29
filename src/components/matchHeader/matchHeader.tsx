import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import type {IEvent} from '../../../assets/api/dto/IMatch';
import {formatDate} from '../../../assets/constants/date';
import {CustomImage} from '../customImage/customImage';
import {useTranslation} from 'react-i18next';
import {useContext, useState} from 'react';
import {InitialStateContext} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import Timer from '../timer/timer';

const TeamBlock = ({
  teamLogo,
  teamName,
  teamId,
}: {
  teamLogo: string;
  teamName: string;
  teamId: string;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.getParent()?.navigate('TeamScreen', {
          title: teamName,
          image: teamLogo,
          teamId,
        })
      }
      style={styles.teamBlock}>
      <CustomImage
        src={teamLogo}
        imageStyles={styles.teamImage}
        mockImg={require('../../../assets/images/mockLogos/noTeam.png')}
      />
      <Text style={styles.leagueText} numberOfLines={1}>
        {teamName}
      </Text>
    </TouchableOpacity>
  );
};

interface IProps {
  event: IEvent;
}

export const MatchHeader = ({event}: IProps) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {differanceTimeZoneInMs} = useContext(InitialStateContext);
  const [isLiveState, setIsLiveState] = useState(false);
  const gtmTime = Math.floor(new Date().getTime() / 1000);
  const isMatchStart = gtmTime >= (event.start_time || 0);
  const isMatchEnd = event.end_time && gtmTime >= event.end_time;
  const isLive = isMatchStart && !isMatchEnd;
  return (
    <ImageBackground
      resizeMode="cover"
      imageStyle={{borderRadius: 8}}
      source={{
        uri: `https://assets.jokerlivestream.vip/${event.bg_image}`,
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.getParent()?.navigate('League', {
              title: event.league.name,
              image: event.league.logo,
              leagueId: event.league.uuid,
            })
          }
          style={styles.leagueBlock}>
          <CustomImage
            src={event.league.logo}
            src2={event.location.flag}
            imageStyles={styles.leagueImage}
            mockImg={require('../../../assets/images/mockLogos/noLeague.png')}
          />
          <Text numberOfLines={1} style={styles.leagueText}>
            {event.league.name}
          </Text>
        </TouchableOpacity>
        <View style={styles.teamsBlock}>
          <TeamBlock
            teamId={event.participantHome.uuid}
            teamLogo={event.participantHome.logo}
            teamName={event.participantHome.name}
          />
          {isMatchStart || isMatchEnd || isLiveState ? (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <View style={styles.scoreSquareBlock}>
                <Text style={styles.scoreSquare}>
                  {event.participantHome?.score || '-'}
                </Text>
                <Text style={{fontFamily: 'Rubik-Bold', color: colors.white}}>
                  :
                </Text>
                <Text style={styles.scoreSquare}>
                  {event.participantAway?.score || '-'}
                </Text>
              </View>
              {event?.halftime_score ? (
                <Text
                  style={{color: colors.white, position: 'absolute', top: 34}}>
                  ({event?.halftime_score})
                </Text>
              ) : null}
            </View>
          ) : (
            <Timer
              endTime={(event?.start_time || 0) * 1000}
              onEnd={() => setIsLiveState(true)}
            />
          )}
          <TeamBlock
            teamId={event.participantAway.uuid}
            teamLogo={event.participantAway.logo}
            teamName={event.participantAway.name}
          />
        </View>
        <View
          style={[
            styles.dateBlock,
            {
              backgroundColor:
                isLive || isLiveState ? colors.violet : colors.blackOpacity,
            },
          ]}>
          {isLive || isLiveState ? (
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 300,
    backgroundColor: colors.blackOpacity,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  leagueBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueImage: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  leagueText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Rubik-Bold',
  },
  teamsBlock: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamBlock: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  teamImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
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
    fontSize: 16,
  },
  scoreSquareBlock: {
    width: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scoreSquare: {
    color: colors.violet,
    fontSize: 16,
    fontFamily: 'Rubik-Bold',
    textTransform: 'uppercase',
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
