import {colors} from '../../../assets/colors/colors';
import React from 'react';
import {useTranslation} from 'react-i18next';
import DetailsScreen from './components/detailsScreen';
import fixturesScreen from './components/fixturesScreen';
import PastScreen from './components/pastScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TeamScreen({route}: {route: any}) {
  const {t} = useTranslation();
  return (
    <Tab.Navigator
      initialRouteName="Details"
      screenOptions={() => ({
        lazy: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.darkBlue,
          paddingBottom: 5,
          borderTopColor: colors.blue[700],
        },
        headerPressOpacity: 10,
        tabBarActiveTintColor: colors.violet,
        tabBarInactiveTintColor: colors.blue.DEFAULT,
      })}>
      <Tab.Screen
        name="Details"
        options={{title: t('teamPage.tabs.details') || ''}}
        component={DetailsScreen}
        initialParams={route.params}
      />
      <Tab.Screen
        name="Fixtures"
        options={{title: t('teamPage.tabs.feature') || ''}}
        component={fixturesScreen}
        initialParams={route.params}
      />
      <Tab.Screen
        name="Past"
        component={PastScreen}
        options={{title: t('teamPage.tabs.past') || ''}}
        initialParams={route.params}
      />
    </Tab.Navigator>
  );
}

export default TeamScreen;
