import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';

const footerItems = [
  {
    title: 'football-live-stream',
    children: [
      {name: 'World Cup 2022', link: 'mainPageName', withoutTitle: true},
      {name: 'UEFA Champions League', link: 'uefa-champions-league/3132b3c1'},
      {name: 'UEFA Europe League', link: 'uefa-europa-league/45887e0c'},
      {name: 'Premier League', link: 'premier-league/53662bee'},
      {name: 'La Liga', link: 'laliga/90bdf1bd'},
      {name: 'Bundesliga', link: 'bundesliga/d9215e58'},
      {name: 'Serie A', link: 'serie-a/4c28cff0'},
      {name: 'Ligue 1', link: 'ligue-1/dfe37a95'},
    ],
  },
  {
    title: 'basketball',
    children: [
      {name: 'NBA', link: 'nba/104a40f5'},
      {name: 'Euroleague', link: 'euroleague/88241a03'},
      {name: 'Eurocup', link: 'eurocup/7498ce80'},
      {name: 'Serie A', link: 'serie-a/b647b795'},
      {name: 'A1', link: 'a1/a76c6880'},
      {name: 'Liga ACB', link: 'liga-acb/65535fd9'},
    ],
  },
  {
    title: 'tennis',
    children: [
      {name: 'WTA Finals', link: 'wta-finals/820863bb'},
      {name: 'Davis Cup', link: 'davis-cup/5ea8c1ac'},
    ],
  },
  {
    title: 'american-football',
    children: [{name: 'NFL', link: 'nfl/e889a4fb'}],
  },
];

export const Footer = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
      />
      <View style={styles.marketImgContainer}>
        <View style={[styles.marketImgBlock, {marginRight: 10}]}>
          <Image
            style={styles.marketImg}
            source={require('../../../assets/images/markets/instagram.png')}
          />
        </View>
        <View style={styles.marketImgBlock}>
          <Image
            style={styles.marketImg}
            source={require('../../../assets/images/markets/telegram.png')}
          />
        </View>
      </View>
      <Text style={styles.companyText}>© 2020 JokerLivestream</Text>
      {footerItems.map((el, i) => (
        <View style={styles.sportBlock} key={i}>
          <View style={styles.sportTitleBlock}>
            <Text style={styles.sportTitleText}>{t(`footer.${el.title}`)}</Text>
          </View>
          {el.children.map((childEl, childIndex) => (
            <View
              style={styles.sportDescriptionBlock}
              key={childIndex * (i + 1)}>
              <Text style={styles.sportDescriptionText}>{childEl.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 50,
    paddingBottom: 50,
  },
  logo: {
    width: 80,
    height: 35,
  },
  marketImgContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
  },
  marketImgBlock: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteOpacity1,
    alignSelf: 'flex-start',
    borderRadius: 8,
  },
  marketImg: {
    width: 18,
    height: 18,
  },
  companyText: {
    fontSize: 12,
    color: colors.blue.DEFAULT,
    textTransform: 'uppercase',
    marginLeft: 5,
    marginBottom: 20,
  },
  sportBlock: {
    marginLeft: 5,
  },
  sportTitleBlock: {
    marginTop: 8,
    marginBottom: 8,
  },
  sportTitleText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: colors.white,
    textTransform: 'uppercase',
  },
  sportDescriptionBlock: {
    marginBottom: 8,
  },
  sportDescriptionText: {
    fontSize: 16,
    color: colors.white,
  },
});
