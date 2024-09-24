import { Dripsy } from './dripsy'
import { NavigationProvider } from './navigation'
import { Provider as StoreProvider} from 'react-redux'
import store from '../../../store'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider store={store}>
      <NavigationProvider>

        <Dripsy>{children}</Dripsy>
      </NavigationProvider>
    </StoreProvider>
  )
}
