import React from 'react';
import {TopMatchItem} from './topMatchItem';
import {TopMatchItemPlug} from '../plugs/topMatchItemPlug';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {IMatch} from '../../../assets/api/dto/IMatch';
import {useTranslation} from 'react-i18next';

interface IProps {
  topMatchesState?: IMatch[];
}

const TopMatches = ({topMatchesState}: IProps) => {
  const {t} = useTranslation();
  return (
    <View style={{marginBottom: 10}}>
      <Text style={styles.topMatchesTitle}>
        {t('matchesPage.topMatchesTitle')}
      </Text>

      <ScrollView horizontal contentContainerStyle={styles.topMatchesContainer}>
        {topMatchesState && topMatchesState?.length
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

export default TopMatches;

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
