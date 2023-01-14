import React, {useCallback, useContext, useEffect, useState} from 'react';
import type {IEvent} from '../../../assets/api/dto/IEvent';
import {InitialStateContext} from '../../../App';
import {eventRepository} from '../../../assets/api/eventRepository';
import {endMatchFilterFunc} from '../../../assets/constants/endMatchFilterFunc';
import {allSettled} from '../../../assets/constants/allSettled';
import {ImageBackgroundLayout} from '../imageBackgroundLayout/imageBackgroundLayout';
import {EventsFlashList} from '../eventsFlashList/eventsFlashList';
import {TopMatches} from '../topMatches/topMatches';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';

const MatchScreen = ({navigation}: {navigation: any}) => {
  const [refreshing, setRefreshing] = useState(false);

  const [topMatchesState, setTopMatchesState] = useState<IEvent[]>();

  useEffect(() => {
    eventRepository
      .fetchTopMatches()
      .then(res =>
        setTopMatchesState([...res.event_of_day, ...res.top_matches]),
      );
  }, []);

  const {currentSport} = useContext(InitialStateContext);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState<number>(1);
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    allSettled([
      eventRepository.fetchAllEvents({
        sport_og_url: currentSport || 'football-live-stream',
      }),
      eventRepository.fetchTopMatches(),
    ])
      .then(([eventRes, matchRes]) => {
        setAllEvents(
          eventRes.state === 'fulfilled'
            ? endMatchFilterFunc(eventRes.value[0]?.data)
            : [],
        );
        setTopMatchesState(
          matchRes.state === 'fulfilled'
            ? [...matchRes.value.event_of_day, ...matchRes.value.top_matches]
            : [],
        );
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, [currentSport]);

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, 60000);

    return () => clearInterval(interval);
  }, [allEvents, onRefresh]);

  useEffect(() => {
    setPage(1);
    setDay(1);
    setLoading(true);
    eventRepository
      .fetchAllEvents({sport_og_url: currentSport || 'football-live-stream'})
      .then(res => setAllEvents(endMatchFilterFunc(res[0]?.data || [])))
      .finally(() => setLoading(false));
  }, [currentSport]);

  const {differanceTimeZoneInMs} = useContext(InitialStateContext);
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
          Show next day events
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
        noDataPropsStyles={{height: 170}}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        listHeaderComponent={
          <TopMatches loading={loading} topMatchesState={topMatchesState} />
        }
        noDataTitle="There are no events today"
        noDataDescription="Come back tomorrow or pick another sport"
      />
    </ImageBackgroundLayout>
  );
};

export default MatchScreen;
