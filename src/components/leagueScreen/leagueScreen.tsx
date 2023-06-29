import {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {ImageBackgroundLayout} from '../imageBackgroundLayout/imageBackgroundLayout';
import type {IEvent} from '../../../assets/api/dto/IMatch';
import {eventRepository} from '../../../assets/api/eventRepository';
import {InitialStateContext} from '../../../App';
import {colors} from '../../../assets/colors/colors';
import {EventsFlashList} from '../eventsFlashList/eventsFlashList';
import {useTranslation} from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';
import {parseAndFilterFunk} from '../../../assets/constants/parseAndFilterFunk';

const LeagueScreen = ({route}: {route: any}) => {
  const {locale, differanceTimeZoneInMs} = useContext(InitialStateContext);
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState(false);
  const pageSize = 10;

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!connection) {
      eventRepository
        .fetchAllEvents({
          league_uuid: route.params.leagueId,
          lang: locale,
        })
        .then(res => setAllEvents(parseAndFilterFunk(res)));
    }
    setRefreshing(false);
  }, [connection, route.params.leagueId, locale]);

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, 60000);

    return () => clearInterval(interval);
  }, [allEvents, onRefresh]);

  useEffect(() => {
    if (!connection) {
      setPage(1);
      setDay(1);
      setLoading(true);
      eventRepository
        .fetchAllEvents({league_uuid: route.params.leagueId, lang: locale})
        .then(res => setAllEvents(parseAndFilterFunk(res)))
        .finally(() => setLoading(false));
    }
  }, [route.params.leagueId, locale, connection]);

  const dateFunc = (startTime: number) =>
    new Date(startTime * 1000 + differanceTimeZoneInMs).toDateString();
  const dates = Array.from(
    new Set(
      allEvents
        .slice(0, page * pageSize)
        .map(elem => dateFunc(elem.start_time)),
    ),
  );

  const dateArrayObj = dates.slice(0, day).map(elem => ({
    date: elem,
    array: allEvents
      .slice(0, page * pageSize)
      .filter(filter => dateFunc(filter.start_time) === elem),
  }));

  const isAllDateLength = dateArrayObj.some(
    (el, i) =>
      i === day - 1 &&
      el.array.length ===
        allEvents.filter(filter => dateFunc(filter.start_time) === el.date)
          .length,
  );

  const renderLoader = () => {
    return allEvents.slice(0, page * pageSize).length ===
      allEvents.length ? null : isAllDateLength ? (
      <TouchableOpacity
        onPress={() => setDay(prevState => prevState + 1)}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 42,
          backgroundColor: colors.darkBlueOpacity,
          borderRadius: 8,
        }}>
        <Text style={{color: colors.white, fontFamily: 'Rubik-Bold'}}>
          {t('matchesPage.showNextDayEvents')}
        </Text>
      </TouchableOpacity>
    ) : (
      <View style={{paddingVertical: 10}}>
        <ActivityIndicator size="large" color={colors.blue.DEFAULT} />
      </View>
    );
  };

  const loadMoreItems = () => {
    !isAllDateLength && setPage(prevState => prevState + 1);
  };

  return (
    <ImageBackgroundLayout>
      <EventsFlashList
        dateArrayObj={dateArrayObj}
        renderLoader={renderLoader}
        loadMoreItems={loadMoreItems}
        pageSize={pageSize}
        noDataPropsStyles={{height: 600}}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        noDataTitle={t('leaguePage.noDataTitle')}
        noDataDescription={t('leaguePage.noDataDescription')}
      />
    </ImageBackgroundLayout>
  );
};

export default LeagueScreen;
