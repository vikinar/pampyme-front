import { Platform } from 'react-native'

export const useGetCurrentRoute =
  Platform.OS === 'web'
    ? require('./index.web').useCurrentRoute
    : require('./index.native').useCurrentRoute
