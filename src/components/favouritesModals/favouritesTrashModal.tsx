import React, {useContext} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {InitialStateContext} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  setVisible: () => void;
}

export const FavouritesTrashModal = ({setVisible}: IProps) => {
  const {setFavourites, currentSport, favourites} =
    useContext(InitialStateContext);
  const handleClearFavourites = () => {
    setFavourites([]);
    AsyncStorage.removeItem(currentSport);
    setVisible();
  };
  return (
    <Modal
      onRequestClose={setVisible}
      visible={true}
      animationType="fade"
      transparent>
      <Pressable onPress={setVisible} style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>
            {favourites.length
              ? "Are you sure, that's you want to clear favourites?"
              : 'There is nothing to clear'}
          </Text>
          <Text style={styles.text}>
            {favourites.length
              ? 'Favourites by current sport will be deleted'
              : 'Favourites by current sport is empty'}
          </Text>
          <View style={styles.buttonsBlock}>
            <TouchableOpacity
              onPress={setVisible}
              style={[
                styles.buttonBlock,
                !favourites.length ? {width: '100%'} : {width: '48%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClearFavourites}
              style={[
                styles.buttonBlock,
                !favourites.length ? {display: 'none'} : {width: '48%'},
              ]}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBlueOpacity,
  },
  textBlock: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.darkBlue,
    maxWidth: 300,
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
    backgroundColor: colors.blueOpacity,
    width: '48%',
    borderRadius: 8,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: colors.whiteOpacity1,
  },
});
