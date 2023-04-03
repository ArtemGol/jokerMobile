import {ImageBackgroundLayout} from '../imageBackgroundLayout/imageBackgroundLayout';
import type {IEvent} from '../../../assets/api/dto/IEvent';
import React, {useCallback, useEffect, useState} from 'react';
import {eventRepository} from '../../../assets/api/eventRepository';
import {MatchHeader} from '../matchHeader/matchHeader';
import {
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {CustomImage} from '../customImage/customImage';
import {allSettled} from '../../../assets/constants/allSettled';
import type {IStream} from '../../../assets/api/dto/IStream';
import {StreamPlug} from '../plugs/streamPlug';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigationState} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {useTranslation} from 'react-i18next';

const MatchScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const {t} = useTranslation();
  const routes = useNavigationState(state => state.routes);
  const currentMatch: IEvent = route.params.item;
  const [refreshing, setRefreshing] = useState(false);
  const [matchState, setMatchState] = useState<IEvent>(currentMatch);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState(false);
  const [streamState, setStreamState] = useState<
    {collection: Record<string, IStream[]>}[]
  >([]);

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

  const allSettledFunc = async () =>
    await allSettled([
      eventRepository.fetchEvent(currentMatch.match_uuid, currentMatch.uuid),
      eventRepository.fetchStreams(currentMatch.uuid),
    ])
      .then(([eventRes, streamsRes]) => {
        const event =
          eventRes.state === 'fulfilled' ? eventRes.value?.[0] || '' : '';
        setMatchState({
          ...currentMatch,
          bg_image: event.bg_image,
          participant_1_uuid: event.participantHome_uuid,
          participant_2_uuid: event.participantAway_uuid,
          halftime_score: event?.halftime_score,
        });
        if (currentMatch.bg_image !== event.bg_image) {
          navigation.setParams({
            item: {...route.params.item, bg_image: event.bg_image},
          });
        }
        setStreamState(
          streamsRes.state === 'fulfilled' ? streamsRes.value : [],
        );
      })
      .finally(() => setLoading(false));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!connection) {
      allSettledFunc();
    }
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMatch, connection]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('timeOutId');
      if (value !== null) {
        clearTimeout(Number(value));
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (routes[0].name === 'Splash' && routes.length === 2) {
      getData();
    }
    if (!connection) {
      setLoading(true);
      allSettledFunc().finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMatch, connection]);

  const handleReplace = async (url: string) => await Linking.openURL(url);

  const handleSecret = (stream: string) =>
    navigation.navigate('Stream', {
      title: t('streamPage.aboutStream'),
      item: matchState,
      stream,
    });

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
        contentContainerStyle={styles.container}>
        <MatchHeader event={matchState} />
        <Text style={styles.title}>{t('matchPage.streams')}</Text>
        {loading ? (
          <StreamPlug />
        ) : (
          streamState?.map(elem =>
            Object.entries(elem.collection)
              .filter(
                ([key]) => key !== 'JokerHDpass - HD ads free streams only!',
              )
              .map(([key, value], i) => (
                <View key={key + i}>
                  {value.some(
                    someElem =>
                      someElem.name === 'YouTube' ||
                      key === '(English) - Deposit and watch!',
                  ) ? (
                    <Text style={styles.streamTitle}>{key}</Text>
                  ) : null}
                  {value
                    .filter(
                      el =>
                        key !== 'Other Links' ||
                        (key === 'Other Links' && el.name === 'YouTube'),
                    )
                    .map((childEl, index) => (
                      <TouchableOpacity
                        onPress={() =>
                          childEl.type === 'ql'
                            ? handleReplace(childEl.stream)
                            : handleSecret(childEl.stream)
                        }
                        key={index}
                        style={styles.streamBlock}>
                        <CustomImage
                          imageStyles={
                            childEl.name === 'YouTube'
                              ? styles.youtubeImg
                              : styles.streamImage
                          }
                          src={childEl.icon}
                        />
                        <Text style={styles.streamLink}>
                          {t('matchPage.link')} #{index + 1}
                        </Text>
                        <Text style={styles.streamDescription}>
                          {childEl.description}
                        </Text>
                        <View style={styles.watchBlock}>
                          <Text style={styles.watchText}>
                            {t('matchPage.watch')}
                          </Text>
                          <Icon
                            name="chevron-right"
                            size={15}
                            color={colors.white}
                          />
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              )),
          )
        )}
      </ScrollView>
    </ImageBackgroundLayout>
  );
};

export default MatchScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
    marginBottom: 15,
  },
  streamTitle: {
    fontSize: 14,
    fontFamily: 'Rubik-Bold',
    color: colors.white,
    marginBottom: 5,
  },
  streamBlock: {
    backgroundColor: colors.darkBlueOpacity,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: colors.violet,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  streamImage: {
    width: 16,
    height: 16,
  },
  youtubeImg: {
    width: 22,
    height: 16,
  },
  streamLink: {
    fontSize: 14,
    color: colors.violet,
  },
  streamDescription: {
    fontSize: 14,
    color: colors.white,
    width: '40%',
  },
  watchBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.violet,
    borderRadius: 8,
    height: 30,
    paddingHorizontal: 5,
  },
  watchText: {
    fontSize: 14,
    fontFamily: 'Rubik-Bold',
    color: colors.white,
  },
});
