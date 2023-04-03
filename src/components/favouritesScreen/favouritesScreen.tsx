import React, {useCallback, useContext, useState} from 'react';
import {ImageBackgroundLayout} from '../imageBackgroundLayout/imageBackgroundLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InitialStateContext} from '../../../App';
import {EventsFlashList} from '../eventsFlashList/eventsFlashList';
import {endMatchFilterFunc} from '../../../assets/constants/endMatchFilterFunc';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const FavouritesScreen = () => {
  const {t} = useTranslation();
  const {differanceTimeZoneInMs, favourites, setFavourites} =
    useContext(InitialStateContext);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState(false);
  const pageSize = 10;
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      setFavourites(
        value !== null ? endMatchFilterFunc(JSON.parse(value)) : [],
      );
    } catch (e) {}
  };

  const dateFunc = (startTime: number) =>
    new Date(startTime * 1000 + differanceTimeZoneInMs).toDateString();
  const dates = Array.from(
    new Set(
      favourites
        .slice(0, page * pageSize)
        .map(elem => dateFunc(elem.start_time)),
    ),
  );

  const dateArrayObj = dates.map(elem => ({
    date: elem,
    array: favourites
      .slice(0, page * pageSize)
      .filter(filter => dateFunc(filter.start_time) === elem),
  }));

  const renderLoader = () => {
    return favourites.slice(0, page * pageSize).length ===
      favourites.length ? null : (
      <View style={{paddingVertical: 10}}>
        <ActivityIndicator size="large" color={colors.blue.DEFAULT} />
      </View>
    );
  };

  const loadMoreItems = () => {
    setPage(prevState => prevState + 1);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    readData().finally(() => {
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackgroundLayout>
      <EventsFlashList
        loadMoreItems={loadMoreItems}
        renderLoader={renderLoader}
        dateArrayObj={dateArrayObj}
        pageSize={pageSize}
        noDataPropsStyles={{height: 600}}
        refreshing={refreshing}
        onRefresh={onRefresh}
        noDataTitle={t('favoritesPage.noDataTitle')}
        noDataDescription={t('favoritesPage.noDataDescription')}
      />
    </ImageBackgroundLayout>
  );
};

export default FavouritesScreen;
