import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {colors} from '../colors/colors';

export const CloseIcon = () => {
  return (
    <Svg style={styles.svg} fill={colors.white} viewBox="0 0 48 48">
      <Path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    marginTop: 5,
    width: 25,
    height: 25,
  },
});
