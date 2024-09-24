import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { configureStore } from '@reduxjs/toolkit'
import store from '../../store'
import { Provider as StoreProvider } from 'react-redux'

export default function App() {
  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  )
}