import { FontLoader } from 'app/provider/FontLoader'
import { DripsyProvider, Text } from 'dripsy'
import * as Font from 'expo-font'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Platform } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'

// @ts-ignore
import { changeLanguage, i18n, initializeI18n } from '../../../i18n'
import store from '../../../store'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeTranslations = async () => {
      await initializeI18n()
      setIsInitialized(true)
    }
    initializeTranslations().then(() => setIsInitialized(true))
  }, [changeLanguage])

  return (
    <StoreProvider store={store}>
      <NavigationProvider>
        <I18nextProvider i18n={i18n}>
          <Dripsy>
            {Platform.OS === 'web' ? (
              <>
                {!isInitialized ? <Text>Загрузка переводов...</Text> : children}
              </>
            ) : (
              <FontLoader>
                {!isInitialized ? <Text>Загрузка переводов...</Text> : children}
              </FontLoader>
            )}
          </Dripsy>
        </I18nextProvider>
      </NavigationProvider>
    </StoreProvider>
  )
}
