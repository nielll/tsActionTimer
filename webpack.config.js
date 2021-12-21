const path = require('path');
module.exports = {
   entry: "./src/index.ts",
   target: "web",
   output: {
       filename: "bundle.js",
       path: path.resolve(__dirname, 'public/dist'),
       library: 'tsBackTiming', //add this line to enable re-use
       libraryExport: 'default',  // export the default as window.MyClass
   },
   resolve: {
       extensions: [".webpack.js", ".web.js", ".ts", ".js"]
   },
   module: {
       rules: [{ test: /.ts$/, loader: "ts-loader" }]
   },
   devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
}