import * as Linking from 'expo-linking'
import { ReactNode, useMemo } from 'react'

import { NavigationContainer } from '@react-navigation/native'

export function NavigationProvider({ children }: { children: ReactNode }) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'home',
            screens: {
              home: '',
              'user-detail': 'user/:id',
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  )
}
