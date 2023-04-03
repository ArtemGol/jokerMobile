import {
  Modal,
  PermissionsAndroid,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../../assets/colors/colors';
import {useTranslation} from 'react-i18next';
import {modalStyles} from './modalStyles';
import RNFetchBlob from 'rn-fetch-blob';
import {DownLoadNotification} from '../../services/LocalPushControlller';
import {useState} from 'react';

interface IProps {
  setVisible: () => void;
  description: string;
}

export const NeedUpdateModal = ({setVisible, description}: IProps) => {
  const [isLoad, setIsLoad] = useState(false);
  const fileUrl =
    'https://assets.jokerlivestream.vip/app/android/jokerlivestream-app.apk?v=9';

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          buttonNegative: undefined,
          buttonNeutral: undefined,
          buttonPositive: '',
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
        setIsLoad(true);
        setVisible();
      }
    } catch (err) {
      console.log('++++' + err);
    }
  };

  const downloadFile = () => {
    let date = new Date();
    let FILE_URL: any = fileUrl;
    let file_ext: any = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/joker_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .catch(er => console.log(er))
      .finally(() => {
        setIsLoad(false);
        DownLoadNotification({
          title: t('pushNotifications.notification.title'),
          message: t('pushNotifications.notification.message'),
          filePath: true,
        });
      });
  };

  const getFileExtention = (fileUrl1: any) => {
    return /[.]/.exec(fileUrl1) ? /[^.]+$/.exec(fileUrl1) : undefined;
  };

  const {t} = useTranslation();
  return (
    <Modal
      onRequestClose={setVisible}
      visible={true}
      animationType="fade"
      transparent>
      <Pressable onPress={setVisible} style={modalStyles.container}>
        <View style={[modalStyles.textBlock, {maxWidth: 350}]}>
          <Text style={modalStyles.title}>{t('updateModal.title')}</Text>
          <Text style={modalStyles.text}>
            {t('updateModal.description.first')}
          </Text>
          {description.split(';').map((el, i) => (
            <Text key={i} style={modalStyles.text}>{`${i + 1}.${el}`}</Text>
          ))}
          <View style={modalStyles.buttonsBlock}>
            <TouchableOpacity
              onPress={setVisible}
              style={[
                modalStyles.buttonBlock,
                {backgroundColor: colors.green},
                {width: '48%'},
              ]}>
              <Text
                style={[modalStyles.buttonText, {color: colors.whiteOpacity1}]}>
                {t('favoritesPage.trashModal.cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isLoad ? undefined : () => checkPermission()}
              style={[
                modalStyles.buttonBlock,
                {backgroundColor: colors.white},
                {width: '48%'},
              ]}>
              <Text style={[modalStyles.buttonText, {color: colors.black}]}>
                {t('updateModal.download')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
