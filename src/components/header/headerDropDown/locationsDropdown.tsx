import React, {useContext, useState} from 'react';
import {
  GestureResponderEvent,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../../assets/colors/colors';
import {DropDownIcon} from '../../../../assets/icons/dropDownIcon';
import {DropDownModalLayout} from './components/dropDownModalLayout';
import {
  imageOptions,
  localeOptions,
} from '../../../../assets/constants/localeOptions';
import {useTranslation} from 'react-i18next';
import {InitialStateContext} from '../../../../App';

export const LocationsDropdown = () => {
  const {i18n} = useTranslation();
  const {setLocale} = useContext(InitialStateContext);
  const [open, setOpen] = useState<boolean>(false);
  const handleSetActiveLocation = (e: GestureResponderEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    i18n.changeLanguage(key).then();
    setLocale(key);
  };
  return (
    <Pressable onPress={() => setOpen(!open)} style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{localeOptions[i18n.language]}</Text>
        <DropDownIcon
          propStyles={{transform: [{rotate: open ? '-90deg' : '90deg'}]}}
          stroke={colors.white}
        />
      </View>
      <Image
        style={styles.mainImg}
        source={{
          uri: `https://assets.jokerlivestream.vip/uploads/locations/${
            imageOptions[i18n.language]
          }.png`,
        }}
      />
      {open && (
        <DropDownModalLayout
          onPress={() => {
            setOpen(false);
          }}>
          <ScrollView
            onScroll={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
            contentContainerStyle={styles.optionsBlock}>
            {Object.entries(localeOptions)
              .filter(([key]) => key !== i18n.language)
              .map(([key, value]) => (
                <Pressable
                  onPress={e => handleSetActiveLocation(e, key)}
                  key={key}
                  style={styles.optionItem}>
                  <Text style={styles.optionSpan}>{value}</Text>
                  <Image
                    style={styles.mainImg}
                    source={{
                      uri: `https://assets.jokerlivestream.vip/uploads/locations/${imageOptions[key]}.png`,
                    }}
                  />
                </Pressable>
              ))}
          </ScrollView>
        </DropDownModalLayout>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: colors.blueOpacity1,
  },
  textBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
  },
  mainImg: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  optionsBlock: {
    width: 260,
    paddingTop: 5,
    paddingBottom: 5,
    top: 128,
    left: 10,
    borderRadius: 8,
    position: 'absolute',
    backgroundColor: colors.blueOpacity1,
  },
  optionItem: {
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 30,
  },
  optionSpan: {
    color: colors.white,
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
  },
});
