import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';

interface IProps {
  onPress: () => void;
}

export const BurgerIcon = ({onPress}: IProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row} />
      <View style={styles.row} />
      <View style={styles.row} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  row: {
    alignSelf: 'flex-start',
    backgroundColor: colors.black,
    height: 2.5,
    width: 25,
    marginBottom: 5,
  },
});
