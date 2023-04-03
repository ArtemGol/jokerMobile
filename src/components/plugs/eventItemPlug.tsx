import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

interface ITeam {
  propsStyles?: object;
}

const TeamBlock = ({propsStyles}: ITeam) => {
  return (
    <View style={[styles.teamBlock, propsStyles]}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/mockLogos/noTeam.png')}
      />
      <View style={[styles.textPlug, {width: 80, marginLeft: 10}]} />
    </View>
  );
};

export const ItemPlug = () => (
  <View style={styles.eventItem}>
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <Image
          style={styles.leagueImage}
          source={require('../../../assets/images/mockLogos/noLeague.png')}
        />
        <View style={[styles.textPlug, {width: 150, marginBottom: 5}]} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <View style={[styles.textPlug, {width: 40, marginTop: 5}]} />
        </View>
        <View>
          <TeamBlock propsStyles={{marginBottom: 5}} />
          <TeamBlock />
        </View>
      </View>
    </View>
    <AwesomeIcon name="star" size={25} color={colors.blue.DEFAULT} />
  </View>
);

export const EventItemPlug = () => {
  return (
    <View>
      <View style={styles.dateTitle} />
      {new Array(2).fill(null).map((_, i) => (
        <ItemPlug key={i} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dateTitle: {
    height: 20,
    width: 150,
    marginBottom: 10,
    backgroundColor: colors.blue.DEFAULT,
  },
  textPlug: {
    height: 18,
    backgroundColor: colors.blue.DEFAULT,
  },
  leagueImage: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  eventItem: {
    flexDirection: 'row',
    height: 91,
    backgroundColor: colors.darkBlueOpacity,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 20,
    height: 20,
  },
  teamBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});
