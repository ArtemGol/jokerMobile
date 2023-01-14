import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {Football} from '../../../assets/icons/gameIcons/football';
import {CloseIcon} from '../../../assets/icons/closeIcon';
import {useContext, useState} from 'react';
import {InitialStateContext} from '../../../App';
import {HeaderInput} from '../headerInput/headerInput';

interface IProps {
  navigation: any;
  route: any;
}

export function SportsModal({navigation}: IProps) {
  const {currentSport, setCurrentSport, allSports} =
    useContext(InitialStateContext);
  const [value, setValue] = useState<string>('');
  const handleNavigate = (sportName: string, sportUrl: string) => {
    navigation.navigate('Football', {title: sportName});
    setCurrentSport(sportUrl);
  };
  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
      <View>
        <HeaderInput
          placeholder="Choose your sport"
          onClear={() => navigation.goBack()}
          setValue={setValue}
        />
      </View>
      {allSports
        ?.filter(
          filer => filer.name.toLowerCase().indexOf(value.toLowerCase()) > -1,
        )
        .map((el, i) => (
          <TouchableOpacity
            onPress={() => handleNavigate(el.name, el.og_url)}
            key={i}
            style={[
              styles.navbarItem,
              currentSport === el.og_url && {
                backgroundColor: colors.blueOpacity1,
              },
            ]}>
            <Football />
            <Text style={styles.text}>{el.name}</Text>
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
