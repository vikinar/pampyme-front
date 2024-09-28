import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { Provider as StoreProvider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import store from '../../store'

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}
