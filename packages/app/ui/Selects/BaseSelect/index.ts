import { Platform } from 'react-native'

export const BaseSelect =
  Platform.OS === 'web'
    ? require('./index.web').BaseSelect
    : require('./index.native').BaseSelect
