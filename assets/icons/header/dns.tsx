import Svg, {Circle, G, Line, Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {colors} from '../../colors/colors';

interface IProps {
  style: object;
}

export const Dns = ({style}: IProps) => {
  return (
    <Svg
      style={[styles.svg, style]}
      viewBox="0 0 14 14"
      fill="none"
      stroke={colors.blue.DEFAULT}>
      <G>
        <Circle
          cx="7"
          cy="7"
          r="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="0.5"
          y1="7"
          x2="13.5"
          y2="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M9.5,7A11.22,11.22,0,0,1,7,13.5,11.22,11.22,0,0,1,4.5,7,11.22,11.22,0,0,1,7,.5,11.22,11.22,0,0,1,9.5,7Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    width: 18,
    height: 18,
  },
});
