// @ts-ignore
// import { FileSystem } from './utils/FileSystem/FileSystem'
import type * as ExpoFileSystem from 'expo-file-system'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { Platform } from 'react-native'

const assetFiles = {
  en: require('./assets/locales/en/common.json'),
  ru: require('./assets/locales/ru/common.json'),
  hy: require('./assets/locales/hy/common.json'),
}

const changeLanguage = async (lng: string) => {
  await i18n.changeLanguage(lng)
}

const initializeI18n = async () => {
  const lng = Platform.OS !== 'web' ? i18n.language || 'ru' : i18n.language

  i18n.use(initReactI18next)

  if (Platform.OS === 'web') {
    i18n.use(HttpBackend)
    i18n.use(LanguageDetector)
  }

  await i18n.init({
    compatibilityJSON: 'v3',
    fallbackLng: 'ru',
    lng,
    ns: ['common'],
    defaultNS: 'common',
    backend:
      Platform.OS === 'web'
        ? { loadPath: 'locales/{{lng}}/{{ns}}.json' }
        : undefined,
    interpolation: { escapeValue: true },
    react: { useSuspense: true },
    initImmediate: false,
    detection:
      Platform.OS === 'web'
        ? {
            order: ['path', 'navigator'],
            lookupFromPathIndex: 0,
          }
        : {},
  })

  return true
}

export { initializeI18n, i18n, changeLanguage }
