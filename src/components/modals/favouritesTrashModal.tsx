import React, {useContext} from 'react';
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {InitialStateContext} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import PushNotification from 'react-native-push-notification';
import {modalStyles} from './modalStyles';

interface IProps {
  setVisible: () => void;
}

export const FavouritesTrashModal = ({setVisible}: IProps) => {
  const {t} = useTranslation();
  const {setFavourites, favourites} = useContext(InitialStateContext);
  const handleClearFavourites = () => {
    AsyncStorage.removeItem('favourites');
    PushNotification.cancelAllLocalNotifications();
    setVisible();
    setFavourites([]);
  };
  return (
    <Modal
      onRequestClose={setVisible}
      visible={true}
      animationType="fade"
      transparent>
      <Pressable onPress={setVisible} style={modalStyles.container}>
        <View style={[modalStyles.textBlock, {maxWidth: 300}]}>
          <Text style={modalStyles.title}>
            {t(
              `favoritesPage.trashModal.${
                favourites.length ? 'full' : 'empty'
              }.title`,
            )}
          </Text>
          <Text style={modalStyles.text}>
            {t(
              `favoritesPage.trashModal.${
                favourites.length ? 'full' : 'empty'
              }.description`,
            )}
          </Text>
          <View style={modalStyles.buttonsBlock}>
            <TouchableOpacity
              onPress={setVisible}
              style={[
                modalStyles.buttonBlock,
                {backgroundColor: colors.green},
                !favourites.length ? {width: '100%'} : {width: '48%'},
              ]}>
              <Text
                style={[modalStyles.buttonText, {color: colors.whiteOpacity1}]}>
                {t('favoritesPage.trashModal.cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClearFavourites}
              style={[
                modalStyles.buttonBlock,
                {backgroundColor: colors.white},
                !favourites.length ? {display: 'none'} : {width: '48%'},
              ]}>
              <Text style={[modalStyles.buttonText, {color: colors.black}]}>
                {t('favoritesPage.trashModal.clear')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
