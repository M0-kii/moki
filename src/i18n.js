import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import faTranslations from './translations/fa.json';

const resources = {
  en: {
    translation: enTranslations
  },
  fa: {
    translation: faTranslations
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator'],
    }
  });

export default i18n;