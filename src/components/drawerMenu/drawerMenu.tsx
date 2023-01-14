import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {LocationsDropdown} from '../header/headerDropDown/locationsDropdown';
import {HeaderDropDown} from '../header/headerDropDown/headerDropDown';
import {CustomButton} from '../customButton/customButton';
import {AddIcon} from '../../../assets/icons/addIcon';
import {useTranslation} from 'react-i18next';

export const DrawerMenu = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <HeaderDropDown />
      <LocationsDropdown />
      <CustomButton
        text={t('header.addStream')}
        blockStyles={{
          backgroundColor: colors.green,
          marginTop: 10,
          marginBottom: 10,
        }}
        textStyles={{color: colors.white}}
        icon={<AddIcon fill={colors.green} />}
      />
      <CustomButton
        text={t('header.subscribe')}
        blockStyles={{backgroundColor: colors.white}}
        textStyles={{color: colors.black}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: colors.white,
  },
});
