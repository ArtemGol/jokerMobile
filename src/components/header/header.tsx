import {Image, StyleSheet, View, ScrollView, Text} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {BurgerIcon} from '../burgerIcon/burgerIcon';
import {useState} from 'react';
import {height, width} from '../../../assets/constants/fullScreen';
import {HeaderInput} from './headerInput/headerInput';
import {tabsWithIcons} from '../../../assets/constants/mockHeaderTabs';
import {useTranslation} from 'react-i18next';
import {CustomButton} from '../customButton/customButton';
import {AddIcon} from '../../../assets/icons/addIcon';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {t} = useTranslation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.burger}>
          <BurgerIcon open={open} onPress={() => setOpen(!open)} />
        </View>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/logo.png')}
        />
      </View>
      {open && (
        <ScrollView style={styles.menu}>
          <HeaderInput />
          <View style={styles.tabs}>
            {tabsWithIcons.map(el => (
              <View key={el.name} style={styles.tab}>
                {el.icon({marginRight: 15})}
                <Text style={styles.tabText}>
                  {t(`header.tabs.${el.name}`)}
                </Text>
              </View>
            ))}
          </View>
          <CustomButton
            text={t('header.addStream')}
            blockStyles={{backgroundColor: colors.green, marginBottom: 10}}
            textStyles={{color: colors.white}}
            icon={<AddIcon fill={colors.green} />}
          />
          <CustomButton
            text={t('header.subscribe')}
            blockStyles={{backgroundColor: colors.white}}
            textStyles={{color: colors.black}}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    backgroundColor: colors.darkBlue,
  },
  burger: {
    position: 'absolute',
    top: 25,
    left: 20,
  },
  logo: {
    width: 99,
    height: 48,
  },
  text: {
    color: colors.white,
    fontFamily: 'Rubik-Bold',
    fontSize: 24,
  },
  menu: {
    padding: 12,
    borderColor: colors.blue.DEFAULT,
    borderTopWidth: 1,
    flex: 1,
    backgroundColor: colors.darkBlue,
    position: 'absolute',
    width,
    height,
    top: 64,
  },
  tabs: {
    marginTop: 15,
    marginBottom: 10,
  },
  tab: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  tabText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
