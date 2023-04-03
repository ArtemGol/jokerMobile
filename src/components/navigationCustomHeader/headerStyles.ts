import {StyleSheet} from 'react-native';
import {colors} from '../../../assets/colors/colors';

export const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: colors.darkBlueOpacity,
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.white,
    marginLeft: 10,
    marginRight: 5,
    maxWidth: 310,
  },
  image: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  noConnectionBlock: {
    backgroundColor: colors.bloodRed,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: '100%',
    top: 50,
  },
  noConnectionTitle: {
    fontSize: 16,
    color: colors.white,
  },
});
