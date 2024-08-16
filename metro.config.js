//const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
//
///**
// * Metro configuration
// * https://reactnative.dev/docs/metro
// *
// * @type {import('metro-config').MetroConfig}
// */
//const config = {};
//
//module.exports = mergeConfig(getDefaultConfig(__dirname), config);
//
//
//
//
//
//

const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: ['tflite', 'png'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
