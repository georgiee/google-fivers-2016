import webpack from 'webpack';
import path from 'path';

const developmentFlags = {
  devtool: 'source-map',
  historyApiFallback: false,
  watch: true
}

const entry = {
  vendor: [ ],
  application: './src/js/application.js'
}

const output = {
  filename: '[name].js',
  sourceMapFilename: '[file].map'
}

const externals = {
  "dat.GUI": "dat.GUI",
  "paper": "paper"
}


const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    loader: 'babel'
  }
];

const module = {
  loaders
}

const plugins = [
 new webpack.ProvidePlugin({
    "THREE": "three"
  }) 
]

const resolve = {
  root: path.resolve(__dirname, 'js')
}

const webpackConfig = {
  ...developmentFlags,
  entry, output, module, externals, plugins, resolve, 
  context: __dirname,
  node: { __filename: true }

}
export default webpackConfig;