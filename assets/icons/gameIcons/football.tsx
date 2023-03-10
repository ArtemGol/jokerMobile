import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';
import {colors} from '../../colors/colors';

export const Football = () => (
  <Svg style={styles.svg} viewBox="0 0 20 20" fill={colors.violet}>
    <Path d="m17 2.9c-3.9-3.9-10.2-3.9-14.1 0s-3.9 10.2 0 14.1c2.5 2.5 6.2 3.5 9.6 2.6s6.1-3.6 7-7c1-3.5 0-7.2-2.5-9.7zm.4 2.8c.6 1.1 1 2.2 1.1 3.4l-1.8-1zm-1.4-1.8c.1.1.3.3.4.4l-1.1 3.6-1.3.4-3.3-2.4v-1.4l3.2-2.2c.7.4 1.5.9 2.1 1.6zm-6-2.5c.8 0 1.6.1 2.3.3l-2.3 1.6-2.3-1.6c.7-.2 1.5-.3 2.3-.3zm-6.1 2.5c.6-.7 1.4-1.2 2.2-1.6l3.2 2.2v1.4l-3.3 2.4-1.4-.4-1.1-3.6c.1-.1.3-.3.4-.4zm-1.4 1.8.7 2.4-1.8 1c.1-1.2.5-2.4 1.1-3.4zm1.4 10.3c-.1-.1-.1-.2-.2-.2h2l.7 1.9c-1-.4-1.8-1-2.5-1.7zm2-1.6h-3.3c-.7-1.1-1.1-2.4-1.2-3.7l2.8-1.5 1.4.4 1.3 3.9zm6 3.9c-1.3.3-2.7.3-4 0l-1-3 1.1-1.1h3.8l1.1 1.1zm0-5.4h-3.9l-1.1-3.7 3.1-2.2 3.1 2.3zm4.1 3.1c-.7.7-1.5 1.3-2.4 1.7l.7-1.9h2c-.1.1-.2.2-.3.2zm-2-1.6-.9-.9 1.3-3.9 1.4-.4 2.8 1.5c-.1 1.3-.5 2.6-1.2 3.7z" />
  </Svg>
);

const styles = StyleSheet.create({
  svg: {
    width: 25,
    height: 25,
  },
});
