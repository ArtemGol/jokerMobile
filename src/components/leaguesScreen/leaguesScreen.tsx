import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {ImageBackgroundLayout} from '../imageBackgroundLayout/imageBackgroundLayout';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {HeaderInput} from '../headerInput/headerInput';
import {IItem} from '../../../assets/interfaces/IItem';
import {InitialStateContext} from '../../../App';
import {eventRepository} from '../../../assets/api/eventRepository';
import {CustomImage} from '../customImage/customImage';
import {NoData} from '../noData/noData';
import {LeaguesPlug} from '../plugs/leaguesPlug';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';

const LeaguesScreen = ({navigation}: {navigation: any}) => {
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [connection, setConnection] = useState(false);
  const {currentSport} = useContext(InitialStateContext);
  const [value, setValue] = useState<string>('');
  const [leagues, setLeagues] = useState<IItem[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnection(!state.isInternetReachable);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(!state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!connection) {
      setLoading(true);
      eventRepository.fetchLeagues(currentSport || '').then(res => {
        setLeagues(res);
        setLoading(false);
      });
    }
  }, [currentSport, connection]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!connection) {
      eventRepository.fetchLeagues(currentSport || '').then(res => {
        setLeagues(res);
      });
    }
    setRefreshing(false);
  }, [connection, currentSport]);

  return (
    <ImageBackgroundLayout>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[colors.blue.DEFAULT]}
            progressBackgroundColor={colors.darkBlue}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={styles.container}
        stickyHeaderIndices={[0]}>
        <HeaderInput
          setValue={setValue}
          placeholder={t('leaguesPage.placeholder')}
          onClear={() => setValue('')}
        />
        {loading ? (
          new Array(4).fill(null).map((_, i) => <LeaguesPlug key={i} />)
        ) : leagues && leagues.length ? (
          leagues
            ?.filter(
              filer =>
                filer.league_name.toLowerCase().indexOf(value.toLowerCase()) >
                -1,
            )
            .map((el, i) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.getParent().navigate('League', {
                    title: el.league_name,
                    image: el.league_logo,
                    leagueId: el.league_uuid,
                  })
                }
                style={styles.navbarItem}
                key={i}>
                <CustomImage
                  mockImg={require('../../../assets/images/mockLogos/noLeague.png')}
                  src={el.league_logo}
                  imageStyles={styles.image}
                />
                <Text style={styles.text}>{el.league_name}</Text>
              </TouchableOpacity>
            ))
        ) : (
          <NoData
            title={t('leaguesPage.noDataTitle')}
            description={t('matchesPage.noDataDescription')}
            propsStyles={{height: 550}}
          />
        )}
      </ScrollView>
    </ImageBackgroundLayout>
  );
};

export default LeaguesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textBlock: {
    borderRadius: 8,
    backgroundColor: colors.darkBlueOpacity,
  },
  textInput: {
    fontSize: 20,
    color: colors.white,
  },
  navbarItem: {
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    color: colors.white,
    marginLeft: 15,
  },
});
