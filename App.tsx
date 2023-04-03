/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import SplashScreen from 'react-native-splash-screen';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {Image, StatusBar, View} from 'react-native';
import './i18n.config';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {colors} from './assets/colors/colors';
import {sportsRepository} from './assets/api/sportsRepository';
import {ISports} from './assets/api/dto/IMeta';
import {SportsModal} from './src/components/modal/sportsModal';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerMenu from './src/components/drawerMenu/drawerMenu';
import MatchesScreen from './src/components/matchesScreen/matchesScreen';
import LeaguesScreen from './src/components/leaguesScreen/leaguesScreen';
import FavouritesScreen from './src/components/favouritesScreen/favouritesScreen';
import {FavouritesTrashModal} from './src/components/modals/favouritesTrashModal';
import {IEvent} from './assets/api/dto/IEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endMatchFilterFunc} from './assets/constants/endMatchFilterFunc';
import PushNotification, {Importance} from 'react-native-push-notification';
import LeagueScreen from './src/components/leagueScreen/leagueScreen';
import MatchScreen from './src/components/matchScreen/matchScreen';
import StreamScreen from './src/components/streamScreen/streamScreen';
import {navigationRef} from './src/services/RootNavigation';
import {ImageBackgroundLayout} from './src/components/imageBackgroundLayout/imageBackgroundLayout';
import NetInfo from '@react-native-community/netinfo';
import {NavigationCustomHeader} from './src/components/navigationCustomHeader/navigationCustomHeader';
import {useTranslation} from 'react-i18next';
import {NavigationCustomMatchHeader} from './src/components/navigationCustomHeader/navigationCustomMatchHeader';
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';
import {NeedUpdateModal} from './src/components/modals/needUpdateModal';
import {versionRepository} from './assets/api/versionRepository';
import teamScreen from './src/components/teamScreen/teamScreen';

interface InitialStateContextInterface {
  allSports: ISports[];
  setAllSports: (all: ISports[]) => void;
  differanceTimeZoneInMs: number;
  setTimeZone: (ms: number) => void;
  locale: string;
  setLocale: (locale: string) => void;
  currentSport: string | null;
  setCurrentSport: (sport: string) => void;
  favourites: IEvent[];
  setFavourites: (events: IEvent[]) => void;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

const InitialState: InitialStateContextInterface = {
  allSports: [],
  setAllSports(all) {
    InitialState.allSports = all;
  },
  differanceTimeZoneInMs: 1000,
  setTimeZone(ms) {
    InitialState.differanceTimeZoneInMs = ms;
  },
  locale: 'en',
  setLocale(locale) {
    InitialState.locale = locale;
  },
  currentSport: null,
  setCurrentSport(sport) {
    InitialState.currentSport = sport;
  },
  favourites: [],
  setFavourites(favourites) {
    InitialState.favourites = favourites;
  },
  isChecked: false,
  setIsChecked(checked) {
    InitialState.isChecked = checked;
  },
};

export const InitialStateContext =
  createContext<InitialStateContextInterface>(InitialState);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  const {t} = useTranslation();
  const {favourites} = useContext(InitialStateContext);
  return (
    <Tab.Navigator
      initialRouteName="Matches"
      screenOptions={({route}) => ({
        lazy: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkBlue,
          paddingBottom: 5,
          borderTopColor: colors.blue[700],
        },
        headerPressOpacity: 10,
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Leagues') {
            iconName = 'trophy';
          } else if (route.name === 'Matches') {
            iconName = 'clock-o';
          } else if (route.name === 'Favourites') {
            iconName = 'star';
          }

          // You can return any component that you like here!
          return <AwesomeIcon name={`${iconName}`} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.violet,
        tabBarInactiveTintColor: colors.blue.DEFAULT,
      })}>
      <Tab.Screen
        name="Matches"
        options={{title: t('bottomMenu.matches') || ''}}
        component={MatchesScreen}
      />
      <Tab.Screen
        name="Leagues"
        options={{title: t('bottomMenu.leagues') || ''}}
        component={LeaguesScreen}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarBadge: favourites.length || undefined,
          title: t('bottomMenu.favourites') || '',
        }}
      />
    </Tab.Navigator>
  );
}

function SplashScreenNav({navigation}: {navigation: any}) {
  const timeOutId = setTimeout(() => navigation.replace('Football'), 2000);
  AsyncStorage.setItem('timeOutId', String(timeOutId));
  return (
    <ImageBackgroundLayout>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('./assets/images/screenlogo.png')} />
      </View>
    </ImageBackgroundLayout>
  );
}

function MainPage() {
  const {t} = useTranslation();
  const [visibleModal, setVisibleModal] = useState(false);
  const [connection, setConnection] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnection(!state.isInternetReachable);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnection(!state.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Group>
        <Stack.Screen
          name="Splash"
          component={SplashScreenNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Football"
          component={Home}
          options={({route, navigation}) => ({
            header: () => (
              <>
                <NavigationCustomHeader
                  connection={connection}
                  onLeftIconPress={() => navigation.openDrawer()}
                  onRightIconPress={() => setVisibleModal(true)}
                  onTitlePress={
                    getFocusedRouteNameFromRoute(route) === 'Favourites'
                      ? undefined
                      : () => navigation.navigate('MyModal')
                  }
                  title={
                    getFocusedRouteNameFromRoute(route) === 'Favourites'
                      ? t('bottomMenu.favourites')
                      : t(
                          `sportsPage.sportList.${
                            // @ts-ignore
                            route.params?.title || 'a2804112'
                          }`,
                        )
                  }
                  bgImage="participants/UY4rS7dgnMJYKxreKfh4AXyocneLtw5XL6xz1er4LmvpzRp4WG.jpeg"
                  leftIconName={'menu'}
                  rightIconName={
                    getFocusedRouteNameFromRoute(route) === 'Favourites'
                      ? 'trash'
                      : undefined
                  }
                />
                {visibleModal && (
                  <FavouritesTrashModal
                    setVisible={() => setVisibleModal(false)}
                  />
                )}
              </>
            ),
          })}
        />
        <Stack.Screen
          name="Match"
          options={({route, navigation}) => ({
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.darkBlueOpacity,
            },
            headerBackVisible: false,
            header: () => (
              <NavigationCustomMatchHeader
                connection={connection}
                // @ts-ignore
                bgImage={route.params?.item.bg_image}
                leftIconName="arrow-back"
                // @ts-ignore
                title={route.params?.title}
                rightAwesomeIconName="star"
                // @ts-ignore
                item={route.params?.item}
                onLeftIconPress={() =>
                  navigation.getState().routes[0].name === 'Splash' &&
                  navigation.getState().routes.length === 2
                    ? navigation.replace('Football')
                    : navigation.goBack()
                }
              />
            ),
          })}
          component={MatchScreen}
        />
        <Stack.Screen
          name="Stream"
          options={({route, navigation}) => ({
            header: () => (
              <NavigationCustomHeader
                connection={connection}
                // @ts-ignore
                bgImage={route.params?.item.bg_image}
                leftIconName="arrow-back"
                // @ts-ignore
                title={route.params?.title}
                onLeftIconPress={() => navigation.goBack()}
              />
            ),
          })}
          component={StreamScreen}
        />
        <Stack.Screen
          name="League"
          options={({route, navigation}) => ({
            header: () => (
              <NavigationCustomHeader
                connection={connection}
                // @ts-ignore
                image={route.params?.image}
                bgImage={
                  // @ts-ignore
                  route.params?.image?.[0] === '/'
                    ? // @ts-ignore
                      route.params?.image.slice(0, route.params?.image.length)
                    : // @ts-ignore
                      route.params?.image
                }
                leftIconName="arrow-back"
                // @ts-ignore
                title={route.params?.title}
                onLeftIconPress={() => navigation.goBack()}
              />
            ),
          })}
          component={LeagueScreen}
        />
        <Stack.Screen
          name="TeamScreen"
          options={({route, navigation}) => ({
            header: () => (
              <NavigationCustomHeader
                connection={connection}
                // @ts-ignore
                image={route.params?.image}
                bgImage={
                  // @ts-ignore
                  route.params?.image?.[0] === '/'
                    ? // @ts-ignore
                      route.params?.image.slice(0, route.params?.image.length)
                    : // @ts-ignore
                      route.params?.image
                }
                leftIconName="arrow-back"
                // @ts-ignore
                title={route.params?.title}
                onLeftIconPress={() => navigation.goBack()}
              />
            ),
          })}
          component={teamScreen}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="MyModal"
          component={SportsModal}
          options={{headerShown: false, animation: 'fade_from_bottom'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const App = () => {
  const {i18n} = useTranslation();
  const createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'channel-id',
        channelName: 'My channel',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };
  const [{allSports}, setAllSports] = useState(InitialState);
  const [{differanceTimeZoneInMs}, setTimeZone] = useState(InitialState);
  const [{locale}, setLocale] = useState(InitialState);
  const [{currentSport}, setCurrentSport] = useState(InitialState);
  const [{favourites}, setFavourites] = useState(InitialState);
  const [{isChecked}, setIsChecked] = useState(InitialState);
  const [visibleUpdatesModal, setVisibleUpdatesModal] = useState(false);
  const [description, setDescription] = useState<string>('');

  const handleSetTimeZone = (ms: number) =>
    setTimeZone(state => ({...state, differanceTimeZoneInMs: ms}));
  const handleSetAllSports = (all: ISports[]) =>
    setAllSports(state => ({...state, allSports: all}));
  const handleSetLocale = (loc: string) =>
    setLocale(state => ({...state, locale: loc}));
  const handleSetCurrentSport = (sport: string) =>
    setCurrentSport(state => ({
      ...state,
      currentSport: sport,
    }));
  const handleSetFavourites = (fav: IEvent[]) =>
    setFavourites(state => ({...state, favourites: fav}));
  const handleSetIsChecked = (checked: boolean) =>
    setIsChecked(state => ({...state, isChecked: checked}));

  const readFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      handleSetFavourites(
        value !== null ? endMatchFilterFunc(JSON.parse(value)) : [],
      );
    } catch (e) {}
  };

  const readLocale = async () => {
    try {
      const value = await AsyncStorage.getItem('locale');
      handleSetLocale(value !== null ? value : 'en');
      i18n.changeLanguage(value !== null ? value : 'en').then();
    } catch (e) {}
  };

  const readIsChecked = async () => {
    try {
      const value = await AsyncStorage.getItem('checked');
      handleSetIsChecked(value === 'true');
    } catch (e) {}
  };

  useEffect(() => {
    sportsRepository.fetchAllSports().then(res => {
      handleSetCurrentSport(
        res.find(el => el.name === 'Football')?.og_url || '',
      );
      handleSetAllSports(
        res.filter(
          el =>
            el.uuid !== 'e40a045d' &&
            el.uuid !== '57f045a7' &&
            el.uuid !== 'a0bb958f' &&
            el.uuid !== 'cbe8de34' &&
            el.uuid !== '56558a62' &&
            el.uuid !== 'f8d039e1',
        ),
      );
    });
    createChannel();
    readLocale();
    readFavourites();
    readIsChecked();
    SplashScreen.hide();
    Orientation.unlockAllOrientations();
    versionRepository.fetchVersion().then(res => {
      if (res.version !== DeviceInfo.getVersion()) {
        setVisibleUpdatesModal(true);
        setDescription(res.description || '');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InitialStateContext.Provider
      value={{
        differanceTimeZoneInMs,
        setTimeZone: handleSetTimeZone,
        allSports,
        setAllSports: handleSetAllSports,
        locale,
        setLocale: handleSetLocale,
        currentSport,
        setCurrentSport: handleSetCurrentSport,
        favourites,
        setFavourites: handleSetFavourites,
        isChecked,
        setIsChecked: handleSetIsChecked,
      }}>
      <StatusBar backgroundColor={colors.darkBlue} />
      {visibleUpdatesModal && (
        <NeedUpdateModal
          description={description}
          setVisible={() => setVisibleUpdatesModal(false)}
        />
      )}
      <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          useLegacyImplementation
          screenOptions={{
            drawerStyle: {
              backgroundColor: colors.darkBlue,
            },
          }}
          drawerContent={props => <DrawerMenu {...props} />}>
          <Drawer.Screen
            name="HomeScreen"
            component={MainPage}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </InitialStateContext.Provider>
  );
};

export default App;
