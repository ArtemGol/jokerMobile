import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const TeamBlock = () => (
  <View style={styles.teamBlock}>
    <Image
      style={styles.teamImage}
      source={require('../../../assets/images/mockLogos/noTeam.png')}
    />
  </View>
);

interface IProps {
  first: boolean;
}

export const TopMatchItemPlug = ({first}: IProps) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container, first && {marginRight: 10}]}>
      <View style={styles.leagueBlock}>
        <Image
          style={styles.leagueImage}
          source={require('../../../assets/images/mockLogos/noLeague.png')}
        />
        <View style={styles.textPlug} />
      </View>
      <View style={styles.teamsBlock}>
        <TeamBlock />
        <Text
          style={[
            {
              color: colors.white,
              fontSize: 10,
              fontFamily: 'Rubik-Bold',
              textTransform: 'uppercase',
            },
          ]}>
          {t('matchesPage.vs')}
        </Text>
        <TeamBlock />
      </View>
      <View style={styles.datePlug} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 160,
    backgroundColor: colors.black,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leagueBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leagueImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  teamsBlock: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  teamImage: {
    width: 32,
    height: 32,
  },
  textPlug: {
    height: 15,
    width: 50,
    backgroundColor: colors.blue.DEFAULT,
  },
  datePlug: {
    height: 24,
    width: 120,
    backgroundColor: colors.blue.DEFAULT,
    borderRadius: 8,
    marginTop: 7,
  },
});
