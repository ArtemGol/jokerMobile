import {Linking, Modal, Text, TouchableOpacity, View} from 'react-native';
import {useState} from 'react';
import {colors} from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import {modalStyles} from './modalStyles';

interface IProps {
  setVisible: (visible: boolean) => void;
  setIsChecked: (checked: boolean) => void;
}

export const SuccessAddedModal = ({setVisible, setIsChecked}: IProps) => {
  const {t} = useTranslation();
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!checked);
    AsyncStorage.setItem('checked', `${!checked}`);
  };

  const handleClose = () => {
    setVisible(false);
    setIsChecked(checked);
  };

  return (
    <Modal
      visible={true}
      onRequestClose={handleClose}
      animationType="fade"
      transparent>
      <View style={modalStyles.container}>
        <View style={[modalStyles.textBlock, {maxWidth: 300}]}>
          <Text style={modalStyles.title}>{t('matchesPage.modal.title')}</Text>
          <Text style={[modalStyles.text, {width: 260}]}>
            {t('matchesPage.modal.description')}
          </Text>
          <View style={modalStyles.checkBoxBlock}>
            <TouchableOpacity style={{marginRight: 10}} onPress={handleCheck}>
              <Icon
                name={checked ? 'checkbox-outline' : 'square-outline'}
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
            <Text style={[modalStyles.text, {width: 260}]}>
              {t('matchesPage.modal.checkBox')}
            </Text>
          </View>
          <View style={modalStyles.buttonsBlock}>
            <TouchableOpacity
              onPress={() => Linking.openSettings()}
              style={[
                modalStyles.buttonBlock,
                {backgroundColor: colors.whiteOpacity1},
              ]}>
              <Text style={[modalStyles.buttonText, {color: colors.black}]}>
                {t('matchesPage.modal.buttons.settings')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClose}
              style={[
                modalStyles.buttonBlock,
                {backgroundColor: colors.green},
              ]}>
              <Text
                style={[modalStyles.buttonText, {color: colors.whiteOpacity1}]}>
                {t('matchesPage.modal.buttons.success')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
