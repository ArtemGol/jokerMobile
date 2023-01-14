import Svg, {G, Line, Polyline, Rect} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {colors} from '../../colors/colors';

interface IProps {
  style: object;
}

export const WebMasters = ({style}: IProps) => {
  return (
    <Svg
      style={[styles.svg, style]}
      viewBox="0 0 14 14"
      stroke={colors.blue.DEFAULT}
      fill="none">
      <G>
        <Rect
          x="0.5"
          y="0.5"
          width="13"
          height="13"
          rx="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Line
          x1="0.5"
          y1="4"
          x2="13.5"
          y2="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <G>
          <Polyline
            points="4.5 7 3 8.5 4.5 10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Polyline
            points="10 7 11.5 8.5 10 10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line
            x1="6.5"
            y1="10.5"
            x2="8"
            y2="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
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
