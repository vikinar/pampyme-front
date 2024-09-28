import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import 'intl-pluralrules'

import { Platform } from 'react-native';

const loadPath = '../../locales/{{lng}}/{{ns}}.json';

i18n
  .use(HttpBackend) // Use backend for loading translations
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    lng: 'ru',
    ns: 'common',
    defaultNS: 'common',
    backend: {
      loadPath: loadPath,
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense:false,
    }
  });

export default i18n;