import { DripsyProvider, Text } from 'dripsy'
import * as Font from 'expo-font'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Platform } from 'react-native'
import { Provider as StoreProvider } from 'react-redux'

import { initializeI18n } from '../../../i18n'
import { i18n } from '../../../i18n'
import store from '../../../store'
import { createTheme } from '../theme'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

SplashScreen?.preventAutoHideAsync()

if (Platform.OS !== 'web') {
  const Font = require('expo-font')

  async function loadFonts() {
    await Font.loadAsync({
      'Grapalar Regular': require('../../../assets/fonts/GHEAGrpalatReg.otf'),
    })
  }

  loadFonts()
}

export function Provider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  // const [loaded] = useFonts({
  //   ['Grapalat Regular']: require('../../../assets/fonts/GHEAGrpalatReg.otf'),
  // })

  // useEffect(() => {
  //   if (!loaded) return
  // }, [loaded])

  useEffect(() => {
    const initializeTranslations = async () => {
      await initializeI18n() // Дождитесь инициализации i18n
      setIsInitialized(true) // Установите состояние готовности
    }
    initializeTranslations().then(() => setIsInitialized(true))
  }, [])

  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepareApp() {
      try {
        await Font.loadAsync({
          'Grapalat Regular': require('../../../assets/fonts/GHEAGrpalatReg.otf'),
        })
        setAppIsReady(true)
      } catch (e) {
        console.warn(e)
      } finally {
        // Скрываем экран SplashScreen после завершения загрузки
        await SplashScreen.hideAsync()
      }
    }

    prepareApp()
  }, [])

  if (!appIsReady) {
    return null
  }

  return (
    <DripsyProvider theme={createTheme()}>
      <StoreProvider store={store}>
        <NavigationProvider>
          <I18nextProvider i18n={i18n}>
            <Dripsy>
              {!isInitialized ? <Text>Загрузка переводов...</Text> : children}
            </Dripsy>
          </I18nextProvider>
        </NavigationProvider>
      </StoreProvider>
    </DripsyProvider>
  )
}
