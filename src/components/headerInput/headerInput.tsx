import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  placeholder: string;
  onClear: () => void;
  setValue: Dispatch<SetStateAction<string>>;
}

export const HeaderInput = ({placeholder, onClear, setValue}: IProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClear}>
        <Icon name="close-outline" size={30} color={colors.white} />
      </TouchableOpacity>
      <TextInput
        onChangeText={text => setValue(text?.toLowerCase())}
        style={styles.inputStyles}
        placeholder={placeholder}
        placeholderTextColor={colors.blue.DEFAULT}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.darkBlue,
  },
  inputStyles: {
    padding: 0,
    marginLeft: 10,
    fontSize: 20,
    color: colors.white,
  },
});
