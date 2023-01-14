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

export function LeaguesScreen({navigation}: {navigation: any}) {
  const [refreshing, setRefreshing] = useState(false);
  const {currentSport} = useContext(InitialStateContext);
  const [value, setValue] = useState<string>('');
  const [leagues, setLeagues] = useState<IItem[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    eventRepository.fetchLeagues(currentSport).then(res => {
      setLeagues(res);
      setLoading(false);
    });
  }, [currentSport]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    eventRepository.fetchLeagues(currentSport).then(res => {
      setLeagues(res);
      setLoading(false);
      setRefreshing(false);
    });
  }, [currentSport]);

  return (
    <ImageBackgroundLayout>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.container}
        stickyHeaderIndices={[0]}>
        <HeaderInput
          setValue={setValue}
          placeholder="Choose your league"
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
              <TouchableOpacity style={styles.navbarItem} key={i}>
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
            title="There are no leagues today"
            description="Come back tomorrow or pick another sport"
            propsStyles={{height: 550}}
          />
        )}
      </ScrollView>
    </ImageBackgroundLayout>
  );
}

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
