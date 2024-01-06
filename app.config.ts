import 'ts-node/register'
import { ExpoConfig } from '@expo/config'

const config: ExpoConfig = {
  name: 'my-app-ts',
  slug: 'my-app-ts',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './src/assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#25292e',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.hoppin.scs',
    buildNumber: '1.0.0',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/adaptive-icon.png',
      backgroundColor: '#25292e',
    },
    package: 'com.hoppin.scs',
  },
  web: {
    favicon: './src/assets/favicon.png',
  },
  experiments: {
    tsconfigPaths: true,
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: { newArchEnabled: true },
        android: { newArchEnabled: true },
      },
    ],
  ],
  jsEngine: 'hermes',
}

export default config