import Svg, {Path, Rect} from 'react-native-svg';
import {StyleSheet} from 'react-native';

interface IProps {
  fill: string;
}

export const AddIcon = ({fill}: IProps) => (
  <Svg style={styles.svg} viewBox="0 0 16 16" fill={fill}>
    <Rect width="16" height="16" rx="8" fill="white" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 4.5C9 3.94772 8.55228 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5V7H4.5C3.94772 7 3.5 7.44772 3.5 8C3.5 8.55228 3.94772 9 4.5 9H7V11.5C7 12.0523 7.44772 12.5 8 12.5C8.55228 12.5 9 12.0523 9 11.5V9H11.5C12.0523 9 12.5 8.55228 12.5 8C12.5 7.44772 12.0523 7 11.5 7H9V4.5Z"
    />
  </Svg>
);

const styles = StyleSheet.create({
  svg: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
});
