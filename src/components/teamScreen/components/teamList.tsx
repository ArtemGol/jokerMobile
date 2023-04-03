import React, {lazy, useCallback, useContext, useEffect, useState} from 'react';
import {ImageBackgroundLayout} from '../../imageBackgroundLayout/imageBackgroundLayout';
import {SuccessAddedModal} from '../../modals/successAddedModal';
import {FlashList} from '@shopify/flash-list';
import {ItemPlug} from '../../plugs/eventItemPlug';
import {NoData} from '../../noData/noData';
import {RefreshControl, View} from 'react-native';
import {colors} from '../../../../assets/colors/colors';
import {InitialStateContext} from '../../../../App';
import {useTranslation} from 'react-i18next';
import type {IEvent} from '../../../../assets/api/dto/IEvent';
import {teamRepository} from '../../../../assets/api/teamRepository';
import {endMatchFilterFunc} from '../../../../assets/constants/endMatchFilterFunc';
import NetInfo from '@react-native-community/netinfo';

const DateTableItem = lazy(() => import('../../dateTableItem/dateTableItem'));

interface IProps {
  teamId: string;
  listType: 'feature' | 'past';
}

const TeamList = ({teamId, listType}: IProps) => {
  const {locale} = useContext(InitialStateContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);
  const [connection, setConnection] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (!connection) {
      teamRepository
        .fetchTeamEvents(teamId, listType, locale)
        .then(res =>
          setAllEvents(
            listType === 'feature'
              ? endMatchFilterFunc(res?.events || [])
              : res?.events || [],
          ),
        );
    }
    setRefreshing(false);
  }, [connection, listType, locale, teamId]);

  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, 60000);

    return () => clearInterval(interval);
  }, [allEvents, onRefresh]);

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
      teamRepository
        .fetchTeamEvents(teamId, listType, locale)
        .then(res =>
          setAllEvents(
            listType === 'feature'
              ? endMatchFilterFunc(res?.events || [])
              : res?.events || [],
          ),
        )
        .finally(() => setLoading(false));
    }
  }, [teamId, connection, locale, listType]);
  const {t} = useTranslation();
  const {isChecked, setIsChecked} = useContext(InitialStateContext);
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <ImageBackgroundLayout>
      {visibleModal && !isChecked && (
        <SuccessAddedModal
          setIsChecked={setIsChecked}
          setVisible={setVisibleModal}
        />
      )}
      <FlashList
        ListEmptyComponent={() =>
          loading ? (
            <View>
              {new Array(2).fill(null).map((_, i) => (
                <ItemPlug key={i} />
              ))}
            </View>
          ) : (
            <NoData
              title={t('leaguePage.noDataTitle')}
              description={t('leaguePage.noDataDescription')}
              propsStyles={{height: 600}}
            />
          )
        }
        onEndReachedThreshold={0}
        removeClippedSubviews
        estimatedItemSize={101}
        refreshControl={
          <RefreshControl
            colors={[colors.blue.DEFAULT]}
            progressBackgroundColor={colors.darkBlue}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={allEvents}
        keyExtractor={item => item.uuid}
        contentContainerStyle={{padding: 10}}
        renderItem={({item}) => (
          <DateTableItem
            listType={listType}
            setVisibleModal={() => setVisibleModal(!isChecked)}
            item={item}
          />
        )}
      />
    </ImageBackgroundLayout>
  );
};

export default TeamList;
