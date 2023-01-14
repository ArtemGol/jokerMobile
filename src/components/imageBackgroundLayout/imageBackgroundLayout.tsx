import {ImageBackground, StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {FC, PropsWithChildren} from 'react';

interface IProps {}

export const ImageBackgroundLayout: FC<PropsWithChildren<IProps>> = ({
  children,
}) => {
  return (
    <ImageBackground
      resizeMode="repeat"
      style={{flex: 1}}
      source={require('../../../assets/images/bgscreen.png')}>
      <View style={styles.container}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackOpacity2,
  },
});
