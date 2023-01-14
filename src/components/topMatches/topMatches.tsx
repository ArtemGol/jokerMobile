import React from 'react';
import {TopMatchItem} from './topMatchItem';
import {TopMatchItemPlug} from '../plugs/topMatchItemPlug';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {IEvent} from '../../../assets/api/dto/IEvent';
import {useTranslation} from 'react-i18next';

interface IProps {
  topMatchesState?: IEvent[];
  loading: boolean;
}

export const TopMatches = ({topMatchesState, loading}: IProps) => {
  const {t} = useTranslation();
  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.topMatchesTitle}>
        {t('gamePage.topMatches.title')}
      </Text>
      <ScrollView horizontal contentContainerStyle={styles.topMatchesContainer}>
        {topMatchesState && topMatchesState?.length && !loading
          ? topMatchesState?.map((elem, i) => (
              <TopMatchItem
                event={elem}
                key={i}
                last={i === topMatchesState.length - 1}
              />
            ))
          : new Array(2)
              .fill(null)
              .map((_, i) => <TopMatchItemPlug first={i === 0} key={i} />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topMatchesContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topMatchesTitle: {
    color: colors.white,
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    marginBottom: 5,
  },
});
