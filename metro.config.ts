const { getDefaultConfig } = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.resolver.sourceExts.push(
  'web.ts',
  'native.ts',
  'web.tsx',
  'native.tsx',
  'ts',
  'tsx',
  'js',
  'jsx'
)

module.exports = defaultConfig
