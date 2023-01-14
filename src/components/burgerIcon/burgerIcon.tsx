import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';

interface IProps {
  open: boolean;
  onPress: () => void;
}

export const BurgerIcon = ({open, onPress}: IProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.row, open ? styles.row1Open : styles.row1Close]} />
      <View style={[styles.row, open ? styles.row2Open : styles.row2Close]} />
      <View style={[styles.row, open ? styles.row3Open : styles.row3Close]} />
      <View style={[styles.row, open ? styles.row4Open : styles.row4Close]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 25,
    height: 15,
  },
  row: {
    backgroundColor: colors.blue.DEFAULT,
    height: 2,
    width: 25,
    position: 'absolute',
    borderRadius: 12,
    left: 0,
    top: 0,
  },
  row1Open: {
    display: 'none',
  },
  row1Close: {
    top: 0,
  },
  row2Open: {
    transform: [{rotate: '45deg'}],
    top: 7,
  },
  row2Close: {
    top: 7,
  },
  row3Open: {
    transform: [{rotate: '-45deg'}],
    top: 7,
  },
  row3Close: {
    top: 7,
  },
  row4Open: {
    display: 'none',
  },
  row4Close: {
    top: 14,
  },
});
