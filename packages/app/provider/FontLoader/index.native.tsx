import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'

export function FontLoader({ children }: { children: React.ReactNode }) {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepareApp() {
      try {
        await Font.loadAsync({
          'Grapalat Regular': require('../../../../assets/fonts/GHEAGrpalatReg.otf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        // Скрываем SplashScreen только для React Native
        if (Platform.OS !== 'web') {
          await SplashScreen.hideAsync()
        }
        setAppIsReady(true)
      }
    }

    prepareApp()
  }, [])

  if (!appIsReady) {
    return null
  }

  return <>{children}</>
}
