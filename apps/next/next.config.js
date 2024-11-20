const { withExpo } = require('@expo/next-adapter')
const path = require('node:path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'dripsy',
    '@dripsy/core',
    'moti',
    'app',
    'react-native-reanimated',
    '@expo/html-elements',
    'react-native-gesture-handler',
  ],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'expo-font': false,
      'expo-asset': false,
    }

    config.module.rules.push({
      test: /\.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules/@react-native'),
        path.resolve(__dirname, 'node_modules/react-native'),
      ],
    })

    // Поддержка шрифтов и других бинарных файлов
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource', // Указываем Webpack, что это бинарные ресурсы
      generator: {
        filename: 'static/fonts/[name][ext]', // Путь сохранения ресурсов
      },
    })

    return config
  },
}

module.exports = withExpo(nextConfig)
