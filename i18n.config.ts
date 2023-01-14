import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './assets/locales/locales/en/en';
import {zh} from './assets/locales/locales/zh/zh';
import {id} from './assets/locales/locales/id/id';
import {ru} from './assets/locales/locales/ru/ru';

const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
  id: {
    translation: id,
  },
  ru: {
    translation: ru,
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources,
    fallbackLng: 'en',
  })
  .then();

export default i18n;
