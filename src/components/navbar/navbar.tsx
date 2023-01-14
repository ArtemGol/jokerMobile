import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {Football} from '../../../assets/icons/gameIcons/football';
import {useEffect, useState} from 'react';
import type {ISports} from '../../../assets/api/dto/IMeta';
import {sportsRepository} from '../../../assets/api/sportsRepository';

export const Navbar = () => {
  const [navbarItems, setNavbarItems] = useState<ISports[]>([]);
  useEffect(() => {
    sportsRepository.fetchAllSports().then(res => setNavbarItems(res));
  }, []);
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {navbarItems.map((el, i) => (
        <View key={i} style={styles.navbarItem}>
          <Football />
          <Text style={styles.text}>{el.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    alignItems: 'center',
    backgroundColor: colors.darkBlue,
  },
  navbarItem: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 8,
    height: 32,
    // backgroundColor: colors.blackOpacity,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
});
