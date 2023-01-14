import {EventItemPlug} from '../plugs/eventItemPlug';
import {RefreshControl, StyleSheet, Text} from 'react-native';
import {formatDate} from '../../../assets/constants/date';
import {DateTableItem} from '../dateTableItem/dateTableItem';
import {FlashList} from '@shopify/flash-list';
import {colors} from '../../../assets/colors/colors';
import {NoData} from '../noData/noData';
import type {IEvent} from '../../../assets/api/dto/IEvent';
import {useEffect, useState} from 'react';
import {SuccessAddedModal} from '../favouritesModals/successAddedModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  loading: boolean;
  refreshing: boolean;
  listHeaderComponent?: JSX.Element;
  onRefresh?: () => void;
  noDataTitle: string;
  noDataDescription: string;
  noDataPropsStyles: object;
  loadMoreItems: () => void;
  pageSize: number;
  renderLoader: () => JSX.Element | null;
  dateArrayObj: {date: string; array: IEvent[]}[];
}

export const EventsFlashList = ({
  loading,
  refreshing,
  listHeaderComponent,
  onRefresh,
  noDataDescription,
  noDataTitle,
  noDataPropsStyles,
  loadMoreItems,
  pageSize,
  renderLoader,
  dateArrayObj,
}: IProps) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('checked');
      setIsChecked(value === 'true');
    } catch (e) {}
  };
  useEffect(() => {
    readData();
  }, [isChecked]);
  return (
    <>
      {visibleModal && (
        <SuccessAddedModal
          setIsChecked={setIsChecked}
          setVisible={setVisibleModal}
        />
      )}
      <FlashList
        ListEmptyComponent={() =>
          loading ? (
            <EventItemPlug />
          ) : (
            <NoData
              title={noDataTitle}
              description={noDataDescription}
              propsStyles={noDataPropsStyles}
            />
          )
        }
        onEndReachedThreshold={0}
        removeClippedSubviews
        onEndReached={loadMoreItems}
        estimatedItemSize={pageSize}
        ListFooterComponent={renderLoader}
        ListHeaderComponent={listHeaderComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.container}
        data={dateArrayObj}
        keyExtractor={item => item.date}
        renderItem={({item}) =>
          loading ? (
            <EventItemPlug />
          ) : (
            <>
              <Text style={styles.dateTitle}>
                {formatDate(new Date(item?.date), 'WW, MMMM dd')}
              </Text>
              {item.array.map((el, i) => (
                <DateTableItem
                  setVisibleModal={() => setVisibleModal(!isChecked)}
                  isChecked={isChecked}
                  key={i}
                  item={el}
                />
              ))}
            </>
          )
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  titleBlock: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    color: colors.white,
  },
  dateTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    marginBottom: 10,
    color: colors.white,
  },
});
