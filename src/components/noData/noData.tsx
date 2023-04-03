import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';

interface IProps {
  title: string;
  description: string;
  propsStyles: object;
}

export const NoData = ({title, propsStyles, description}: IProps) => {
  return (
    <View style={[styles.container, propsStyles]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: colors.blue.DEFAULT,
    textAlign: 'center',
  },
  description: {
    color: colors.blue.DEFAULT,
    fontSize: 14,
    textAlign: 'center',
  },
});
