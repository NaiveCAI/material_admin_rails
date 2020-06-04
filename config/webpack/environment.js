const { environment } = require('@rails/webpacker')

const webpack = require('webpack');

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader'
});

environment.loaders.append('expose-loader', {
  test: require.resolve('jquery'),
  use: [{
    loader: 'expose-loader',
    options: '$'
  }]
})

environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  "window.jQuery": 'jquery',
  Popper: ['popper.js', 'default']
}));

module.exports = environment
