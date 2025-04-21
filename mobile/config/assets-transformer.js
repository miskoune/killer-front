var upstreamTransformer = require('metro-react-native-babel-transformer');
var postcssTransformer = require('react-native-postcss-transformer');
var svgTransformer = require('react-native-svg-transformer');

module.exports.transform = function ({ src, filename, options }) {
  if (['css', 'pcss'].some((ext) => filename.endsWith('.' + ext))) {
    return postcssTransformer.transform({ src, filename, options });
  }

  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  }

  return upstreamTransformer.transform({ src, filename, options });
};
