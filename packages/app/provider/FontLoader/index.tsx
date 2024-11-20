import { Platform } from 'react-native'

export const FontLoader =
  Platform.OS === 'web'
    ? require('./index.web').FontLoader
    : require('./index.native').FontLoader
