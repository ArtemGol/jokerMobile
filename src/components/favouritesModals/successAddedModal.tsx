import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {colors} from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}

export const SuccessAddedModal = ({setVisible, setIsChecked}: IProps) => {
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
      onRequestClose={() => setVisible(false)}
      animationType="fade"
      transparent>
      <View style={styles.container}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Added to favorites</Text>
          <Text style={styles.text}>
            You will be notified when this event starts.
          </Text>
          <View style={styles.checkBoxBlock}>
            <TouchableOpacity style={{marginRight: 10}} onPress={handleCheck}>
              <Icon
                name={checked ? 'checkbox-outline' : 'square-outline'}
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
            <Text style={styles.text}>Don't show this message again</Text>
          </View>
          <View style={styles.buttonsBlock}>
            <TouchableOpacity
              onPress={() => Linking.openSettings()}
              style={styles.buttonBlock}>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose} style={styles.buttonBlock}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  checkBoxBlock: {
    flexDirection: 'row',
    alignItems: 'center',
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
