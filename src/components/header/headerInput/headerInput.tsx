import {StyleSheet, TextInput, View} from 'react-native';
import {SearchIcon} from '../../../../assets/icons/searchIcon';
import {colors} from '../../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

export const HeaderInput = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.mainContainer}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        placeholder={`${t('header.placeholder')}`}
        placeholderTextColor={colors.blue.DEFAULT}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 42,
    backgroundColor: colors.blueOpacity1,
    borderRadius: 8,
    position: 'relative',
  },
  input: {
    fontSize: 16,
    paddingLeft: 51,
    color: colors.white,
  },
});
