import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface ITeam {
  propsStyles?: object;
}

const TeamBlock = ({propsStyles}: ITeam) => {
  return (
    <View style={[styles.teamBlock, propsStyles]}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/mockLogos/noTeam.png')}
      />
      <View style={[styles.textPlug, {width: 80, marginLeft: 10}]} />
    </View>
  );
};

export const EventItemPlug = () => {
  return (
    <View>
      <View style={styles.dateTitle} />
      {new Array(2).fill(null).map((_, i) => (
        <View key={i} style={styles.eventItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 5, alignItems: 'center'}}>
              <Image
                style={styles.leagueImage}
                source={require('../../../assets/images/mockLogos/noLeague.png')}
              />
              <View style={[styles.textPlug, {width: 40, marginTop: 5}]} />
            </View>
            <View>
              <View style={[styles.textPlug, {width: 150, marginBottom: 5}]} />
              <TeamBlock propsStyles={{marginBottom: 5}} />
              <TeamBlock />
            </View>
          </View>
          <Icon name="ios-star" size={25} color={colors.blue.DEFAULT} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dateTitle: {
    height: 20,
    width: 150,
    marginBottom: 10,
    backgroundColor: colors.blue.DEFAULT,
  },
  textPlug: {
    height: 18,
    backgroundColor: colors.blue.DEFAULT,
  },
  leagueImage: {
    width: 40,
    height: 40,
  },
  eventItem: {
    flexDirection: 'row',
    height: 91,
    backgroundColor: colors.darkBlueOpacity,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 20,
    height: 20,
  },
  teamBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});
