import { Platform } from 'react-native'

const Icon =
  Platform.OS === 'web' ? require('./Icon.web') : require('./Icon.native')

export default Icon
