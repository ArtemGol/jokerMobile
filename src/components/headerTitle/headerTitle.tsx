import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DropDownIcon} from '../../../assets/icons/dropDownIcon';
import React from 'react';
import {colors} from '../../../assets/colors/colors';

interface IProps {
  setOpen: () => void;
  routeName: string;
}

export const HeaderTitle = ({routeName, setOpen}: IProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={setOpen}>
      <Text style={styles.text}>{routeName}</Text>
      <DropDownIcon
        propStyles={{transform: [{rotate: '90deg'}]}}
        stroke={colors.black}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    marginRight: 10,
  },
});
