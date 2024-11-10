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

let FileSystem

if (Platform.OS !== 'web') {
  FileSystem = require('expo-file-system')
}

const loadTranslationsForNative = async (lng, ns) => {
  if (Platform.OS === 'web') return {}
  const fileUri = `${FileSystem.documentDirectory}locales/${lng}/${ns}.json`
  const fileExists = await FileSystem.getInfoAsync(fileUri)

  if (!fileExists.exists) {
    console.error(`Translation file not found: ${fileUri}`)
    return {}
  }

  const content = await FileSystem.readAsStringAsync(fileUri)
  return JSON.parse(content)
}

const ensureTranslationFilesExist = async (lng) => {
  if (Platform.OS === 'web') return

  const localeFolder = `${FileSystem.documentDirectory}locales/${lng}/`
  const translationFile = `${localeFolder}common.json`
  const fileExists = await FileSystem.getInfoAsync(translationFile)

  if (!fileExists.exists) {
    console.log(`Копирование файла перевода для ${lng}...`)

    await FileSystem.makeDirectoryAsync(localeFolder, { intermediates: true })

    const jsonContent = JSON.stringify(assetFiles[lng])
    await FileSystem.writeAsStringAsync(translationFile, jsonContent)
    // console.log(`Файл перевода скопирован в: ${translationFile}`)
  } else {
    // console.log(`Файл перевода уже существует в: ${translationFile}`)
  }
}

const changeLanguage = async (lng: string) => {
  const currentLng = i18n.language

  if (Platform.OS !== 'web') {
    if (currentLng) {
      i18n.removeResourceBundle(currentLng, 'common')
    }
    await ensureTranslationFilesExist(lng)

    const translations = await loadTranslationsForNative(lng, 'common')
    if (Object.keys(translations).length > 0) {
      i18n.addResourceBundle(lng, 'common', translations, true, true)
    }
  }
  await i18n.changeLanguage(lng)
}

const initializeI18n = async () => {
  const lng = Platform.OS !== 'web' ? i18n.language || 'ru' : i18n.language

  if (Platform.OS !== 'web') {
    await ensureTranslationFilesExist(lng)
  }

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
    react: { useSuspense: false },
    initImmediate: false,
    detection:
      Platform.OS === 'web'
        ? {
            order: ['path', 'navigator'],
            lookupFromPathIndex: 0,
          }
        : {},
  })

  if (Platform.OS !== 'web') {
    const ns = 'common'
    const translations = await loadTranslationsForNative(lng, ns)

    if (Object.keys(translations).length > 0) {
      i18n.addResourceBundle(lng, ns, translations, true, true)
    }
  }

  return true
}

export { initializeI18n, i18n, changeLanguage }
