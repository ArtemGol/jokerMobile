import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {LocationsDropdown} from '../header/headerDropDown/locationsDropdown';
import {HeaderDropDown} from '../header/headerDropDown/headerDropDown';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const DrawerMenu = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      {/*<DrawerItemList {...props} />*/}
      <View style={styles.container}>
        <HeaderDropDown />
        <LocationsDropdown />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 16,
    color: colors.white,
  },
});
