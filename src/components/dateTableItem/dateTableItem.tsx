import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import type {IEvent} from '../../../assets/api/dto/IEvent';
import {formatDate} from '../../../assets/constants/date';
import {CustomImage} from '../customImage/customImage';
import {isLiveFunc} from '../../../assets/constants/isLiveFunc';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sortEventsByDataFunc} from '../../../assets/constants/sortEventsByDataFunc';
import {endMatchFilterFunc} from '../../../assets/constants/endMatchFilterFunc';
import {LocalNotification} from '../../services/LocalPushControlller';
import {useContext, useEffect, useState} from 'react';
import {InitialStateContext} from '../../../App';

interface ITeam {
  teamName: string;
  teamLogo: string;
  propsStyles?: object;
}

const TeamBlock = ({teamName, teamLogo, propsStyles}: ITeam) => {
  return (
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
  );
};

interface IProps {
  item: IEvent;
  setVisibleModal: () => void;
  isChecked: boolean;
}

export const DateTableItem = ({item, setVisibleModal}: IProps) => {
  const {differanceTimeZoneInMs, currentSport, favourites, setFavourites} =
    useContext(InitialStateContext);

  const [currentFavourite, setCurrentFavourite] = useState(
    favourites.some(el => el.uuid === item.uuid),
  );

  useEffect(() => {
    setCurrentFavourite(favourites.some(el => el.uuid === item.uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  const handlePressAsync = async () => {
    try {
      const value = await AsyncStorage.getItem(currentSport);
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.some((elem: IEvent) => elem.uuid === item.uuid)) {
          await AsyncStorage.setItem(
            currentSport,
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
          LocalNotification(item, item.start_time * 1000);
          setVisibleModal();
          await AsyncStorage.setItem(
            currentSport,
            JSON.stringify(
              sortEventsByDataFunc(endMatchFilterFunc([...data, item])),
            ),
          );
          setFavourites(
            sortEventsByDataFunc(endMatchFilterFunc([...data, item])),
          );
        }
      } else {
        LocalNotification(item, item.start_time * 1000);
        setVisibleModal();
        await AsyncStorage.setItem(currentSport, JSON.stringify([item]));
        setFavourites(sortEventsByDataFunc([item]));
      }
    } catch (e) {
      // saving error
    }
  };

  const handlePress = () => {
    setCurrentFavourite(!currentFavourite);
    handlePressAsync();
  };

  return (
    <View
      style={[
        styles.eventItem,
        isLiveFunc(item.start_time, item.end_time) && {
          borderWidth: 2,
          borderColor: colors.violet,
        },
      ]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: 5, alignItems: 'center'}}>
          <CustomImage
            imageStyles={styles.leagueImage}
            src={item.use_league_logo === 'true' ? item.league_logo : item.flag}
            src2={
              item.use_league_logo === 'true' ? item.flag : item.league_logo
            }
            mockImg={require('../../../assets/images/mockLogos/noLeague.png')}
          />
          <Text style={styles.timeText}>
            {formatDate(
              new Date(item.start_time * 1000 + differanceTimeZoneInMs),
              'HH:mm',
            )}
          </Text>
        </View>
        <View>
          <Text style={styles.leagueText} numberOfLines={1}>
            {item.name} - {item.league_name}
          </Text>
          {item?.hasParticipants === 'true' ? (
            <>
              <TeamBlock
                teamName={item.participant_2_name}
                teamLogo={item.participant_2_logo}
                propsStyles={{marginBottom: 5}}
              />
              <TeamBlock
                teamName={item.participant_1_name}
                teamLogo={item.participant_1_logo}
              />
            </>
          ) : (
            <TeamBlock
              teamName={item.event_title}
              teamLogo={item.league_logo}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={{width: 25}} onPress={handlePress}>
        <Icon
          name="ios-star"
          size={25}
          color={currentFavourite ? colors.green : colors.blue.DEFAULT}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: 'row',
    height: 91,
    backgroundColor: colors.darkBlueOpacity,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    flex: 1,
    padding: 10,
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
    fontSize: 18,
    color: colors.white,
    marginTop: 5,
  },
  leagueText: {
    marginBottom: 5,
    fontSize: 14,
    width: 250,
    color: colors.white,
  },
  leagueImage: {
    width: 40,
    height: 40,
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
    marginLeft: 10,
  },
  betweenTeamBlock: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamText: {
    fontFamily: 'Rubik-Bold',
    color: colors.white,
    fontSize: 14,
    marginLeft: 10,
    width: 220,
  },
});
