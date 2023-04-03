import {EventItemPlug} from '../plugs/eventItemPlug';
import {RefreshControl, StyleSheet, Text} from 'react-native';
import {formatDate} from '../../../assets/constants/date';
import {FlashList} from '@shopify/flash-list';
import {colors} from '../../../assets/colors/colors';
import {NoData} from '../noData/noData';
import type {IEvent} from '../../../assets/api/dto/IEvent';
import {lazy, useContext, useState} from 'react';
import {SuccessAddedModal} from '../modals/successAddedModal';
import {InitialStateContext} from '../../../App';

const DateTableItem = lazy(() => import('../dateTableItem/dateTableItem'));

interface IProps {
  loading?: boolean;
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
  const {isChecked, setIsChecked} = useContext(InitialStateContext);
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      {visibleModal && !isChecked && (
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
          <RefreshControl
            colors={[colors.blue.DEFAULT]}
            progressBackgroundColor={colors.darkBlue}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
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
