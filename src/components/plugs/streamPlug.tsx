import {StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import React from 'react';

export const StreamPlug = () => {
  return (
    <View>
      <View style={styles.title} />
      {new Array(2).fill(null).map((_, i) => (
        <View key={i} style={styles.streamBlock}>
          <View style={styles.streamImage} />
          <View style={styles.streamLink} />
          <View style={styles.streamDescription} />
          <View style={styles.watchBlock} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    backgroundColor: colors.blue.DEFAULT,
    height: 20,
    width: 300,
    marginBottom: 5,
  },
  streamBlock: {
    backgroundColor: colors.darkBlueOpacity,
    flexDirection: 'row',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  streamImage: {
    backgroundColor: colors.blue.DEFAULT,
    borderRadius: 100,
    width: 16,
    height: 16,
  },
  streamLink: {
    backgroundColor: colors.blue.DEFAULT,
    height: 20,
    width: 50,
  },
  streamDescription: {
    backgroundColor: colors.blue.DEFAULT,
    height: 20,
    width: '55%',
  },
  watchBlock: {
    backgroundColor: colors.blue.DEFAULT,
    height: 30,
    width: 68,
    borderRadius: 8,
  },
  watchText: {
    fontSize: 14,
    fontFamily: 'Rubik-Bold',
    color: colors.white,
    marginRight: 5,
  },
});
