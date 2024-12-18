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

module.exports = (async () => {
  const config = await getDefaultConfig()
  config.resolver.assetExts.push('otf')
  return config
})()

module.exports = defaultConfig
