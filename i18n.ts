import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as Localization from 'expo-localization'; // for React Native
import { NativeModules, Platform } from 'react-native';

const getDeviceLanguage = (): string => {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13 and later
      : NativeModules.I18nManager.localeIdentifier;

  return locale ? locale.split('_')[0] : Localization.locale.split('-')[0];
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: getDeviceLanguage(), // default language based on the device
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;