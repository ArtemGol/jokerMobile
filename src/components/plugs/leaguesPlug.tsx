import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';

export const LeaguesPlug = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/mockLogos/noLeague.png')}
        style={styles.image}
      />
      <View style={styles.text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 18,
    height: 18,
  },
  text: {
    marginLeft: 15,
    height: 18,
    width: 100,
    backgroundColor: colors.blue.DEFAULT,
  },
});
