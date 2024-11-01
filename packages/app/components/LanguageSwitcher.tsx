import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Platform, View } from 'react-native'
import { useRouter } from 'solito/router'

import { changeLanguage, i18n } from '../../../i18n'

const LanguageSwitcher = () => {
  const router = useRouter()
  // const { language } = useCurrentRoute()

  // const changeLanguage = async (lng: string) => {
  //   if (Platform.OS === 'web') {
  //     // На вебе, меняем язык через изменение URL
  //     router.push(`/${lng}`)
  //   } else {
  //     // На мобильных устройствах просто меняем язык через i18n
  //     await i18n.changeLanguage(lng)
  //     console.log(lng)
  //   }
  // }

  const { t, i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)

  // Обновляем текущее состояние при смене языка
  useEffect(() => {
    const onLanguageChanged = () => {
      setCurrentLang(i18n.language)
    }
    i18n.on('languageChanged', onLanguageChanged)
    return () => {
      i18n.off('languageChanged', onLanguageChanged)
    }
  }, [i18n])

  const switchLanguage = async (lng: string) => {
    await changeLanguage(lng)
  }

  return (
    <View>
      <Button title="English" onPress={() => switchLanguage('en')} />
      <Button title="Русский" onPress={() => switchLanguage('ru')} />
      <Button title="Հայերեն" onPress={() => switchLanguage('hy')} />
    </View>
  )
}

export default LanguageSwitcher
