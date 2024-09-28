import { I18nextProvider } from 'react-i18next'
import { Provider as StoreProvider } from 'react-redux'

import i18n from '../../../i18n'
import store from '../../../store'
import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={store}>
      <NavigationProvider>
        <I18nextProvider i18n={i18n}>
          <Dripsy>{children}</Dripsy>
        </I18nextProvider>
      </NavigationProvider>
    </StoreProvider>
  )
}
