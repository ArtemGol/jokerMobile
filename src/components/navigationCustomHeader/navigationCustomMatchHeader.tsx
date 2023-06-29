import React, {useContext, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import type {IEvent} from '../../../assets/api/dto/IMatch';
import {headerStyles} from './headerStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CancelNotificationSchedule,
  LocalNotification,
} from '../../services/LocalPushControlller';
import {endMatchFilterFunc} from '../../../assets/constants/endMatchFilterFunc';
import {sortEventsByDataFunc} from '../../../assets/constants/sortEventsByDataFunc';
import {isLiveFunc} from '../../../assets/constants/isLiveFunc';
import {SuccessAddedModal} from '../modals/successAddedModal';
import {InitialStateContext} from '../../../App';

interface IItem extends IEvent {
  favourite: boolean;
}

interface IProps {
  connection: boolean;
  bgImage: string;
  leftIconName: string;
  title: string;
  rightAwesomeIconName: string;
  item: IItem;
  onLeftIconPress: () => void;
}

export const NavigationCustomMatchHeader = ({
  bgImage,
  leftIconName,
  title,
  onLeftIconPress,
  connection,
  rightAwesomeIconName,
  item,
}: IProps) => {
  const {t} = useTranslation();
  const {setFavourites, isChecked, setIsChecked} =
    useContext(InitialStateContext);
  const [favourite, setFavourite] = useState(!!item?.favourite);

  const isLive = isLiveFunc(item.start_time, item.end_time);

  const [visibleModal, setVisibleModal] = useState(false);

  const handlePressAsync = async () => {
    try {
      const value = await AsyncStorage.getItem('favourites');
      if (value !== null) {
        const data = JSON.parse(value);
        if (data.some((elem: IEvent) => elem.uuid === item.uuid)) {
          !isLive && CancelNotificationSchedule(item);
          await AsyncStorage.setItem(
            'favourites',
            JSON.stringify(
              endMatchFilterFunc(
                data.filter((filter: IEvent) => filter.uuid !== item.uuid),
              ),
            ),
          );
          setFavourites(
            endMatchFilterFunc(
              data.filter((filter: IEvent) => filter.uuid !== item.uuid),
            ),
          );
        } else {
          !isLive && LocalNotification(item, item.start_time * 1000);
          setVisibleModal(true);
          await AsyncStorage.setItem(
            'favourites',
            JSON.stringify(
              sortEventsByDataFunc(endMatchFilterFunc([...data, item])),
            ),
          );
          setFavourites(
            sortEventsByDataFunc(endMatchFilterFunc([...data, item])),
          );
        }
      } else {
        !isLive && LocalNotification(item, item.start_time * 1000);
        setVisibleModal(true);
        await AsyncStorage.setItem('favourites', JSON.stringify([item]));
        setFavourites(sortEventsByDataFunc([item]));
      }
    } catch (e) {
      // saving error
    }
  };

  const handleSetFavourite = () => {
    setFavourite(!favourite);
    handlePressAsync();
  };

  return (
    <ImageBackground
      blurRadius={100}
      source={{
        uri: `https://assets.jokerlivestream.vip/${bgImage}`,
      }}
      style={headerStyles.container}>
      {visibleModal && !isChecked && (
        <SuccessAddedModal
          setIsChecked={setIsChecked}
          setVisible={setVisibleModal}
        />
      )}
      <View style={headerStyles.backgroundContainer}>
        <View style={headerStyles.rowBlock}>
          {leftIconName && (
            <TouchableOpacity onPress={onLeftIconPress}>
              <Icon name={leftIconName} color={colors.white} size={30} />
            </TouchableOpacity>
          )}
          <View style={headerStyles.rowBlock}>
            <Text numberOfLines={1} style={headerStyles.title}>
              {title}
            </Text>
          </View>
        </View>
        {rightAwesomeIconName && (
          <TouchableOpacity onPress={handleSetFavourite}>
            <AwesomeIcon
              name={rightAwesomeIconName}
              color={favourite ? colors.green : colors.white}
              size={30}
            />
          </TouchableOpacity>
        )}
      </View>
      {connection && (
        <View style={headerStyles.noConnectionBlock}>
          <Text style={headerStyles.noConnectionTitle}>
            {t('matchesPage.noInternetConnection')}
          </Text>
        </View>
      )}
    </ImageBackground>
  );
};
