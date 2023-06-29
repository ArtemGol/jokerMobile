import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {useContext, useState} from 'react';
import {InitialStateContext} from '../../../App';
import {HeaderInput} from '../headerInput/headerInput';
import CustomIcon from '../../../assets/constants/CustomIcon';
import {CustomImage} from '../customImage/customImage';
import {useTranslation} from 'react-i18next';

interface IProps {
  navigation: any;
  route: any;
}

export function SportsModal({navigation}: IProps) {
  const {t} = useTranslation();
  const {currentSport, setCurrentSport, allSports} =
    useContext(InitialStateContext);
  const [value, setValue] = useState<string>('');
  const handleSetParams = (sportId: string, sportUrl: string) => {
    navigation.navigate('Football', {
      title: sportId,
    });
    setTimeout(() => setCurrentSport(sportUrl));
  };

  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
      <View>
        <HeaderInput
          placeholder={t('sportsPage.placeholder')}
          onClear={() => navigation.goBack()}
          setValue={setValue}
        />
      </View>
      {allSports
        ?.filter(
          filer =>
            t(`sportsPage.sportList.${filer.uuid}`)
              .toLowerCase()
              .indexOf(value.toLowerCase()) > -1,
        )
        .map((el, i) => (
          <TouchableOpacity
            onPress={() => handleSetParams(el.uuid, el.og_url)}
            key={i}
            style={[
              styles.navbarItem,
              currentSport === el.og_url && {
                backgroundColor: colors.blueOpacity1,
              },
            ]}>
            {el.svg_icon ? (
              <CustomIcon name={el.uuid} size={25} color={colors.violet} />
            ) : el.sport_logo ? (
              <CustomImage
                src={el.sport_logo}
                imageStyles={{width: 25, height: 25}}
              />
            ) : (
              <CustomIcon name="a2804112" size={25} color={colors.violet} />
            )}
            <Text style={styles.text}>
              {t(`sportsPage.sportList.${el.uuid}`).includes('sportsPage')
                ? el.name
                : t(`sportsPage.sportList.${el.uuid}`)}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {},
  container: {
    backgroundColor: colors.darkBlue,
  },
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.darkBlue,
  },
  modalHeaderTitle: {
    padding: 0,
    marginLeft: 15,
    fontSize: 20,
    color: colors.white,
  },
  navbarItem: {
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 15,
    fontSize: 16,
    color: colors.white,
  },
});
