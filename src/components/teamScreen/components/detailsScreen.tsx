import {ImageBackgroundLayout} from '../../imageBackgroundLayout/imageBackgroundLayout';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../assets/colors/colors';
import {useContext, useEffect, useState} from 'react';
import type {ITeam} from '../../../../assets/api/dto/ITeam';
import {teamRepository} from '../../../../assets/api/teamRepository';
import {InitialStateContext} from '../../../../App';
import {CustomImage} from '../../customImage/customImage';
import {formatDate} from '../../../../assets/constants/date';
import {useTranslation} from 'react-i18next';

const DetailsScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const {t} = useTranslation();
  const {locale} = useContext(InitialStateContext);
  const [team, setTeam] = useState<ITeam | null>(null);
  const infoObj = {
    coach: team?.manager_name,
    foundationDate: team?.foundation_date,
    country: team?.participant_country,
    tournaments: team?.league_name,
  };
  const venueObj = {
    stadium: team?.stadium_name,
    capacity: team?.stadium_capacity,
    city: team?.stadium_city_name,
  };
  const hasInfo =
    team?.manager_name ||
    team?.foundation_date ||
    team?.participant_country ||
    team?.league_name;
  const hasVenue =
    team?.stadium_name || team?.stadium_capacity || team?.stadium_city_name;
  useEffect(() => {
    teamRepository
      .fetchTeam(route.params.teamId, locale)
      .then(res => setTeam(res?.[0] || null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ImageBackgroundLayout>
      <View style={style.container}>
        {hasInfo ? (
          <View style={[style.detailBlock, {marginBottom: 10}]}>
            <Text
              style={[
                style.title,
                {
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginBottom: 10,
                },
              ]}>
              {t('teamPage.info')}
            </Text>
            {Object.entries(infoObj).map(([key, value]) =>
              value ? (
                <TouchableOpacity
                  activeOpacity={key === 'tournaments' ? 0.5 : 1}
                  onPress={() =>
                    key === 'tournaments' && team?.league_uuid
                      ? navigation.getParent().navigate('League', {
                          title: team?.league_name,
                          image: team?.flag,
                          leagueId: team?.league_uuid,
                        })
                      : undefined
                  }
                  key={key}
                  style={style.pareBlock}>
                  <Text style={style.title}>{t(`teamPage.${key}`)}:</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    {key === 'country' || key === 'tournaments' ? (
                      <CustomImage
                        imageStyles={style.image}
                        src={
                          key === 'country'
                            ? `${team?.participant_flag}`
                            : `${team?.flag}`
                        }
                        mockImg={require('../../../../assets/images/mockLogos/noLeague.png')}
                      />
                    ) : null}
                    <Text
                      numberOfLines={1}
                      style={[
                        style.title,
                        {fontFamily: 'Rubik-Bold', maxWidth: 250},
                      ]}>
                      {key === 'foundationDate'
                        ? formatDate(new Date(+value * 1000), 'dd MMM yyyy')
                        : value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
          </View>
        ) : null}
        {hasVenue ? (
          <View style={[style.detailBlock, {marginBottom: 10}]}>
            <Text
              style={[
                style.title,
                {
                  fontFamily: 'Rubik-Bold',
                  textAlign: 'center',
                  marginBottom: 10,
                },
              ]}>
              {t('teamPage.venue')}
            </Text>
            {Object.entries(venueObj).map(([key, value]) =>
              value ? (
                <View key={key} style={style.pareBlock}>
                  <Text style={style.title}>{t(`teamPage.${key}`)}:</Text>
                  <Text
                    style={[
                      style.title,
                      {fontFamily: 'Rubik-Bold', maxWidth: 250},
                    ]}>
                    {value}
                  </Text>
                </View>
              ) : null,
            )}
          </View>
        ) : null}
      </View>
    </ImageBackgroundLayout>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
  },
  detailBlock: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.blueOpacity2,
    borderRadius: 10,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  title: {
    color: colors.white,
    fontSize: 16,
  },
  pareBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blackOpacity1,
    marginBottom: 5,
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default DetailsScreen;
