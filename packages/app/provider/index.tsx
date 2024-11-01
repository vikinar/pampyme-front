import { Text, View } from 'dripsy'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider as StoreProvider } from 'react-redux'

// import i18n from '../../../i18n'
import { initializeI18n } from '../../../i18n'
import { i18n } from '../../../i18n'
import store from '../../../store'
import { useCurrentRoute } from '../../../utils/getCurrentRoute'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  useEffect(() => {
    const initializeTranslations = async () => {
      await initializeI18n() // Дождитесь инициализации i18n
      // setIsInitialized(true) // Установите состояние готовности
    }

    initializeTranslations().then(() => setIsInitialized(true))
  }, [])

  const currentRoute = useCurrentRoute()

  useEffect(() => {
    if (currentRoute) {
      console.log('Current Route:', currentRoute)
      // Можете добавить логику для обработки текущего роута
    }
  }, [currentRoute])

  return (
    <StoreProvider store={store}>
      <NavigationProvider>
        <I18nextProvider i18n={i18n}>
          <Dripsy>
            {!isInitialized ? <Text>Загрузка переводов...</Text> : children}
          </Dripsy>
        </I18nextProvider>
      </NavigationProvider>
    </StoreProvider>
  )
}
