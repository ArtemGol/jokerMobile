import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {colors} from '../colors/colors';

export const ClockIcon = () => (
  <Svg style={styles.svg} viewBox="0 0 18 18" stroke={colors.blue.DEFAULT}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 6.5V9.43748L11 11.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const styles = StyleSheet.create({
  svg: {
    marginRight: 10,
    width: 18,
    height: 18,
  },
});
