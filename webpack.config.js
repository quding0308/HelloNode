const path = require('path');

// 执行的命令
//  npx webpack --config webpack.config.js
// // npm run build -- --colors  build 


module.exports = {
  entry: './public/js/test3.js',
  mode: 'development',  
//   mode: 'production',
  output: {
    filename: 'test3.js',
    path: path.resolve(__dirname, './public/js/dist/')
  }
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   compress: true,
  //   port: 9000
  // }
};