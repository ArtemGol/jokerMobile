import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {colors} from '../colors/colors';

export const SearchIcon = () => {
  return (
    <Svg
      style={styles.svg}
      viewBox="0 0 18 18"
      fill="none"
      stroke={colors.blue.DEFAULT}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.16059 15.3212C12.1153 15.3212 15.3212 12.1153 15.3212 8.16059C15.3212 4.2059 12.1153 1 8.16059 1C4.2059 1 1 4.2059 1 8.16059C1 12.1153 4.2059 15.3212 8.16059 15.3212Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.2235 13.2234L16.9994 17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 12,
    left: 18,
    width: 18,
    height: 18,
  },
});
