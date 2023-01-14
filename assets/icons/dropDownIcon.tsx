import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';

interface IProps {
  stroke: string;
  propStyles: object;
}

export const DropDownIcon = ({propStyles, stroke}: IProps) => {
  return (
    <Svg style={[styles.svg, propStyles]} viewBox="0 0 6 12" stroke={stroke}>
      <Path
        d="M1.06055 10.25L4.78055 6.53C5.07245 6.23696 5.07245 5.76304 4.78055 5.47L1.06055 1.75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    width: 6,
    height: 12,
  },
});
