module.exports = {
  mode: 'development',
  entry: {
    index: './src'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(aff|dic)$/,
        use: 'raw-loader',
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: __dirname + '/lib'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  }
};
