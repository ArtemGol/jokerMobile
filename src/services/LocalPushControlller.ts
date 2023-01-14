import PushNotification from 'react-native-push-notification';
import type {IEvent} from '../../assets/api/dto/IEvent';

export const LocalNotification = (item: IEvent, date: number) => {
  const image = item.league_logo || item.flag;
  console.log(image);
  console.log(new Date(date));
  PushNotification.localNotificationSchedule({
    largeIconUrl: `https://assets.jokerlivestream.vip/${
      image?.[0] === '/' ? image.slice(1, image.length) : image
    }`,
    title: 'The match has already started',
    message: `Don't miss the live stream ${item.participant_1_name} vs ${item.participant_2_name} of ${item.league_name} League`,
    id: Math.clz32(item.start_time + parseInt(item.uuid, 10)),
    channelId: 'channel-id',
    date: new Date(Date.now() + 5000),
    allowWhileIdle: false,

    /* Android Only Properties */
    repeatTime: 1,
  });
};
