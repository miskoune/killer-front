// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  transformer: {
    babelTransformerPath: require.resolve('./config/assets-transformer.js'),
    assetPlugins: [require.resolve('expo-asset/tools/hashAssetFiles')],
    assetRegistryPath: require.resolve(
      'react-native/Libraries/Image/AssetRegistry'
    ),
  },
  resolver: {
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'css', 'pcss', 'svg'],
  },
};
