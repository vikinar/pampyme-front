import { BaseSelect } from 'app/ui/Selects/BaseSelect'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRouter } from 'solito/router'

import { changeLanguage } from '../../../i18n'

const LanguageSwitcher = () => {
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(i18n.language)
  const [isModalVisible, setModalVisible] = useState(false)

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
    if (Platform.OS === 'web') {
      router.push(`/${lng}`)
    }
    await changeLanguage(lng)
    setModalVisible(false)
  }

  // Language options for the dropdown
  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
    { label: 'Հայերեն', value: 'hy' },
  ]

  // Get the label for the currently selected language
  const currentLanguageLabel =
    languageOptions.find((option) => option.value === currentLang)?.label ||
    'Select Language'

  return (
    <View>
      {Platform.OS !== 'web' ? (
        <>
          <Button
            title={currentLanguageLabel} // Display current language label
            onPress={() => setModalVisible(true)}
          />

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 16,
                  minHeight: 100,
                }}
              >
                <Text style={{ fontSize: 18, marginBottom: 12 }}>
                  Select Language
                </Text>
                <BaseSelect
                  options={languageOptions}
                  selectedValue={currentLang}
                  onValueChange={(lng: string) => switchLanguage(lng)}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        <BaseSelect
          options={languageOptions}
          selectedValue={currentLang}
          onValueChange={(lng: string) => switchLanguage(lng)}
        />
      )}
    </View>
  )
}

export default LanguageSwitcher
