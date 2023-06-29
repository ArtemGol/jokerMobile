import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import type {IEvent} from '../../../assets/api/dto/IMatch';
import {formatDate} from '../../../assets/constants/date';
import {CustomImage} from '../customImage/customImage';
import {isLiveFunc} from '../../../assets/constants/isLiveFunc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sortEventsByDataFunc} from '../../../assets/constants/sortEventsByDataFunc';
import {endMatchFilterFunc} from '../../../assets/constants/endMatchFilterFunc';
import {
  CancelNotificationSchedule,
  LocalNotification,
} from '../../services/LocalPushControlller';
import {useContext, useEffect, useState} from 'react';
import {InitialStateContext} from '../../../App';
import {useNavigation} from '@react-navigation/native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useTranslation} from 'react-i18next';

interface ITeam {
  teamName: string;
  teamLogo: string;
  propsStyles?: object;
  score?: string;
}

const TeamBlock = ({teamName, teamLogo, propsStyles, score}: ITeam) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View style={[styles.teamBlock, propsStyles]}>
        <CustomImage
          src={teamLogo}
          imageStyles={styles.image}
          mockImg={require('../../../assets/images/mockLogos/noTeam.png')}
        />
        <Text style={styles.teamText} numberOfLines={1}>
          {teamName}
        </Text>
      </View>
      <Text style={{color: colors.white}}>{score}</Text>
    </View>
  );
};

interface IProps {
  item: IEvent;
  setVisibleModal: () => void;
  listType?: 'feature' | 'past';
}

const DateTableItem = ({item, setVisibleModal, listType}: IProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {differanceTimeZoneInMs, favourites, setFavourites} =
    useContext(InitialStateContext);

  const [currentFavourite, setCurrentFavourite] = useState(
    favourites.some(el => el.uuid === item.uuid),
  );

  const isLive = isLiveFunc(item.start_time, item.end_time);

  useEffect(() => {
    setCurrentFavourite(favourites.some(el => el.uuid === item.uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  const handlePressAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.some((elem: IEvent) => elem.uuid === item.uuid)) {
          !isLive && CancelNotificationSchedule(item);
          await AsyncStorage.setItem(
            'favourites',
            JSON.stringify(
              endMatchFilterFunc(
                data.filter((filter: IEvent) => filter.uuid !== item.uuid),
              ),
            ),
          );
          setFavourites(
            endMatchFilterFunc(
              data.filter((filter: IEvent) => filter.uuid !== item.uuid),
            ),
          );
        } else {
          !isLive && LocalNotification(item, item.start_time * 1000);
          setVisibleModal();
          await AsyncStorage.setItem(
            'favourites',
            JSON.stringify(
              sortEventsByDataFunc(endMatchFilterFunc([...data, item])),
            ),
          );
          setFavourites(
            sortEventsByDataFunc(endMatchFilterFunc([...data, item])),
          );
        }
      } else {
        !isLive && LocalNotification(item, item.start_time * 1000);
        setVisibleModal();
        await AsyncStorage.setItem('favourites', JSON.stringify([item]));
        setFavourites(sortEventsByDataFunc([item]));
      }
    } catch (e) {
      // saving error
    }
  };

  const handlePress = () => {
    if (listType !== 'past') {
      setCurrentFavourite(!currentFavourite);
      handlePressAsync();
    }
  };

  return (
    <TouchableHighlight
      underlayColor={colors.blueOpacity}
      style={[
        {
          height: 91,
          marginBottom: 10,
          borderRadius: 8,
          backgroundColor: colors.darkBlueOpacity,
          overflow: 'hidden',
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
        },
        isLive && {
          borderWidth: 2,
          borderColor: colors.violet,
        },
      ]}
      onPress={() =>
        navigation.getParent()?.navigate('Match', {
          title: t('matchPage.aboutMatch'),
          item: {...item, favourite: currentFavourite},
        })
      }>
      <View style={[styles.eventItem]}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <CustomImage
              imageStyles={styles.leagueImage}
              src={
                item.league.use_league_logo === 'true'
                  ? item.league.logo
                  : item.location.flag
              }
              src2={
                item.league.use_league_logo === 'true'
                  ? item.location.flag
                  : item.league.logo
              }
              mockImg={require('../../../assets/images/mockLogos/noLeague.png')}
            />
            <Text style={styles.leagueText} numberOfLines={1}>
              {item.location.name} - {item.league.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: 10,
              }}>
              {listType ? (
                <Text style={{color: colors.blue.DEFAULT, fontSize: 12}}>
                  {formatDate(
                    new Date(item.start_time * 1000 + differanceTimeZoneInMs),
                    'dd/MM/yyy',
                  )}
                </Text>
              ) : null}
              <Text style={styles.timeText}>
                {formatDate(
                  new Date(item.start_time * 1000 + differanceTimeZoneInMs),
                  'HH:mm',
                )}
              </Text>
            </View>
            <View>
              {item?.hasParticipants === 'true' ? (
                <>
                  <TeamBlock
                    score={item.participantHome?.score}
                    teamName={item.participantHome.name}
                    teamLogo={item.participantHome.logo}
                    propsStyles={{marginBottom: 5}}
                  />
                  <TeamBlock
                    score={item.participantAway?.score}
                    teamName={item.participantAway.name}
                    teamLogo={item.participantAway.logo}
                  />
                </>
              ) : (
                <TeamBlock
                  teamName={item.event_title}
                  teamLogo={item.league.logo}
                />
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[{width: 25}, listType === 'past' ? {opacity: 0.2} : {}]}
          activeOpacity={listType === 'past' ? 0.2 : 0.5}
          onPress={handlePress}>
          <AwesomeIcon
            name="star"
            size={25}
            color={currentFavourite ? colors.green : colors.blue.DEFAULT}
          />
        </TouchableOpacity>
      </View>
    </TouchableHighlight>
  );
};

export default DateTableItem;

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upEventBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.blue.DEFAULT,
  },
  leagueTimeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    width: '51%',
  },
  timeBlock: {
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: colors.white,
  },
  leagueText: {
    marginBottom: 5,
    fontSize: 14,
    width: 280,
    color: colors.blue.DEFAULT,
  },
  leagueImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
  watchBlock: {
    height: 24,
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  watchText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 12,
    color: colors.white,
    marginRight: 5,
  },
  downEventBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 41,
  },
  teamBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  betweenTeamBlock: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamText: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 10,
    width: 200,
  },
});
