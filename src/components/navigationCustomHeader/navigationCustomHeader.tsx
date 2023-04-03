import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomImage} from '../customImage/customImage';
import {useTranslation} from 'react-i18next';
import {headerStyles} from './headerStyles';

interface IProps {
  bgImage: string;
  leftIconName?: string;
  rightIconName?: string;
  title: string;
  onLeftIconPress: () => void;
  onRightIconPress?: () => void;
  onTitlePress?: () => void;
  image?: string;
  connection: boolean;
}

export const NavigationCustomHeader = ({
  bgImage,
  leftIconName,
  rightIconName,
  title,
  image,
  onLeftIconPress,
  onRightIconPress,
  onTitlePress,
  connection,
}: IProps) => {
  const {t} = useTranslation();

  return (
    <ImageBackground
      blurRadius={100}
      source={{
        uri: `https://assets.jokerlivestream.vip/${bgImage}`,
      }}
      style={headerStyles.container}>
      <View style={headerStyles.backgroundContainer}>
        <View style={headerStyles.rowBlock}>
          {leftIconName && (
            <TouchableOpacity onPress={onLeftIconPress}>
              <Icon name={leftIconName} color={colors.white} size={30} />
            </TouchableOpacity>
          )}
          {image && (
            <CustomImage
              imageStyles={headerStyles.image}
              src={image}
              mockImg={require('../../../assets/images/mockLogos/noLeague.png')}
            />
          )}
          <TouchableOpacity
            onPress={onTitlePress}
            activeOpacity={onTitlePress ? 0.5 : 1}
            style={headerStyles.rowBlock}>
            <Text numberOfLines={1} style={headerStyles.title}>
              {title}
            </Text>
            {onTitlePress && (
              <Icon name="chevron-down" size={20} color={colors.white} />
            )}
          </TouchableOpacity>
        </View>
        {rightIconName && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Icon name={rightIconName} color={colors.white} size={30} />
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
