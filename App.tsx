/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {createContext, useEffect, useState} from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import './i18n.config';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from './assets/colors/colors';
import {HeaderTitle} from './src/components/headerTitle/headerTitle';
import {sportsRepository} from './assets/api/sportsRepository';
import {ISports} from './assets/api/dto/IMeta';
import {SportsModal} from './src/components/modal/sportsModal';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {DrawerMenu} from './src/components/drawerMenu/drawerMenu';
import MatchScreen from './src/components/matchScreen/matchScreen';
import {LeaguesScreen} from './src/components/leaguesScreen/leaguesScreen';
import {FavouritesScreen} from './src/components/favouritesScreen/favouritesScreen';
import {FavouritesTrashModal} from './src/components/favouritesModals/favouritesTrashModal';
import {IEvent} from './assets/api/dto/IEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {endMatchFilterFunc} from './assets/constants/endMatchFilterFunc';
import PushNotification, {Importance} from 'react-native-push-notification';

interface InitialStateContextInterface {
  allSports: ISports[];
  setAllSports: (all: ISports[]) => void;
  differanceTimeZoneInMs: number;
  setTimeZone: (ms: number) => void;
  locale: string;
  setLocale: (locale: string) => void;
  currentSport: string;
  setCurrentSport: (sport: string) => void;
  favourites: IEvent[];
  setFavourites: (events: IEvent[]) => void;
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
  currentSport: 'football-live-stream',
  setCurrentSport(sport) {
    InitialState.currentSport = sport;
  },
  favourites: [],
  setFavourites(favourites) {
    InitialState.favourites = favourites;
  },
};

export const InitialStateContext =
  createContext<InitialStateContextInterface>(InitialState);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function NotificationsScreen({navigation}: {navigation: any}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'League') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Match') {
            iconName = focused ? 'ios-football' : 'ios-football-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'ios-star' : 'ios-star-outline';
          }

          // You can return any component that you like here!
          return <Icon name={`${iconName}`} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.violet,
        tabBarInactiveTintColor: colors.gray,
      })}>
      <Tab.Screen
        name="League"
        options={{headerShown: false}}
        component={LeaguesScreen}
      />
      <Tab.Screen
        name="Match"
        options={{headerShown: false}}
        component={MatchScreen}
      />
      <Tab.Screen
        name="Favourites"
        options={{headerShown: false}}
        component={FavouritesScreen}
      />
    </Tab.Navigator>
  );
}

function MainPage() {
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <Stack.Navigator initialRouteName="Football">
      <Stack.Group>
        <Stack.Screen
          name="Football"
          component={Home}
          options={({route, navigation}) => ({
            headerTitle: () => (
              <HeaderTitle
                setOpen={() => navigation.navigate('MyModal')}
                // @ts-ignore
                routeName={route.params?.title || 'Football'}
              />
            ),
            headerLeft: () => (
              <Pressable
                style={[{marginRight: 10}]}
                onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={30} color={colors.black} />
              </Pressable>
            ),
            headerRight: () =>
              getFocusedRouteNameFromRoute(route) === 'Favourites' ? (
                <>
                  <TouchableOpacity onPress={() => setVisibleModal(true)}>
                    <Icon name="trash" size={25} color={colors.black} />
                  </TouchableOpacity>
                  {visibleModal && (
                    <FavouritesTrashModal
                      setVisible={() => setVisibleModal(false)}
                    />
                  )}
                </>
              ) : undefined,
          })}
        />
        <Stack.Screen name="EditPost" component={NotificationsScreen} />
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

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {/*<DrawerItemList {...props} />*/}
      <DrawerMenu />
    </DrawerContentScrollView>
  );
}

const App = () => {
  const ddd = () => {
    console.log('ddd');
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  const [{allSports}, setAllSports] = useState(InitialState);
  const [{differanceTimeZoneInMs}, setTimeZone] = useState(InitialState);
  const [{locale}, setLocale] = useState(InitialState);
  const [{currentSport}, setCurrentSport] = useState(InitialState);
  const [{favourites}, setFavourites] = useState(InitialState);
  useEffect(() => {
    sportsRepository.fetchAllSports().then(res => handleSetAllSports(res));
    ddd();
  }, []);
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
  // const {t} = useTranslation();

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(currentSport);
      handleSetFavourites(
        value !== null ? endMatchFilterFunc(JSON.parse(value)) : [],
      );
    } catch (e) {}
  };

  useEffect(() => {
    readData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSport]);

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
      }}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          useLegacyImplementation
          screenOptions={{
            drawerStyle: {
              backgroundColor: colors.darkBlue,
            },
          }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="HomeScreen"
            component={MainPage}
            options={{headerShown: false}}
          />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </InitialStateContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  burger: {},
});
