import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors/colors';

export const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blueOpacity,
  },
  checkBoxBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBlock: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.darkBlue,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Rubik-Bold',
    color: colors.whiteOpacity1,
  },
  text: {
    fontSize: 14,
    color: colors.whiteOpacity1,
    marginVertical: 10,
  },
  buttonsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonBlock: {
    width: '48%',
    borderRadius: 8,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
