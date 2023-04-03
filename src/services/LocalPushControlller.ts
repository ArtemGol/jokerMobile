import PushNotification from 'react-native-push-notification';
import type {IEvent} from '../../assets/api/dto/IEvent';
import i18n from 'i18next';

export const LocalNotification = (item: IEvent, date: number) => {
  const image = item.league_logo || item.flag;
  PushNotification.localNotificationSchedule({
    largeIconUrl: `https://assets.jokerlivestream.vip/${
      image?.[0] === '/' ? image.slice(1, image.length) : image
    }`,
    title: i18n.t('pushNotifications.scheduleNotification.title') || '',
    message:
      i18n.t('pushNotifications.scheduleNotification.message', {
        homeTeam: item.participant_1_name,
        awayTeam: item.participant_2_name,
        league: item.league_name,
      }) || '',
    id: Math.clz32(item.start_time + parseInt(item.uuid, 10)),
    channelId: 'channel-id',
    date: new Date(date),
    allowWhileIdle: false,
    userInfo: item,

    /* Android Only Properties */
    repeatTime: 1,
  });
};

export const DownLoadNotification = ({
  title,
  message,
  filePath,
}: {
  title: string;
  message: string;
  filePath: boolean;
}) => {
  PushNotification.localNotification({
    title,
    message,
    channelId: 'channel-id',
    userInfo: {filePath},
    allowWhileIdle: false,
  });
};

export const CancelNotificationSchedule = (item: IEvent) => {
  PushNotification.cancelLocalNotification(
    `${Math.clz32(item.start_time + parseInt(item.uuid, 10))}`,
  );
};
