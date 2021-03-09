const path = require("path");
const slsw = require("serverless-webpack");
// const Visualizer = require("webpack-visualizer-plugin");
// const { DuplicatesPlugin } = require("inspectpack/plugin");
// const CircularDependencyPlugin = require("circular-dependency-plugin");

const root = __dirname;
const resolve = uri => path.resolve(root, uri);

const firstLower = str => str.charAt(0).toLowerCase() + str.substring(1)

module.exports = (async () => {
  // const accountId = await slsw.lib.serverless.providers.aws.getAccountId();
  return {
    entry: slsw.lib.entries,
    target: "node",
    devtool: "source-map",
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    resolve: {
      modules: [resolve("./node_modules")],
      extensions: [".ts", ".js"],
      alias: {
        "#enterprise": resolve("src/1-enterprise"),
        "#application": resolve("src/2-application"),
        "#adapter": resolve("src/3-adapter"),
        "#framework": resolve("src/4-framework")
        // ...(slsw.lib.webpack.isLocal
        //   ? {
        //       "aws-sdk": resolve("devops/aws-sdk-local"),
        //       "../node_modules/aws-sdk": resolve("node_modules/aws-sdk")
        //     }
        //   : {})
      }
    },
    externals: [
      /^mysql2/i,
      /^aws-sdk/i,
      /^@newrelic\/aws-sdk/i,
      /^dynamoose/i,
      /^typedi/i,
      /^sequelize/i,
      /^moment/i,
      // /^aws-sdk-mock$/i,
      // ...(slsw.lib.webpack.isLocal ? [] : [/^aws-sdk$/i])
    ],
    resolveLoader: {
      modules: [resolve("./node_modules")]
    },
    plugins: [
      // new Visualizer({
      //   filename: "./statistics.html"
      // }),
      // new DuplicatesPlugin({
      //   emitErrors: false,
      //   verbose: false
      // }),
      // new CircularDependencyPlugin({
      //   // exclude detection of files based on a RegExp
      //   exclude: /node_modules/,
      //   // include specific files based on a RegExp
      //   // include: /dir/,
      //   // add errors to webpack instead of warnings
      //   failOnError: false,
      //   // allow import cycles that include an asyncronous import,
      //   // e.g. via import(/* webpackMode: "weak" */ './file.js')
      //   allowAsyncCycles: false,
      //   // set the current working directory for displaying module paths
      //   cwd: process.cwd()
      // })
      // new webpack.DefinePlugin({
      //   AWS_ACCOUNT_ID: `${accountId}`
      // })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
        {
          test: /\.(ts|js)$/,
          include: [resolve("src")],
          exclude: [/node_module/],
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: path.resolve("dependency-injection.js"),
              options: {
                dependencies: [
                  {
                    whenImport: /#application\/repositories\/i(\w*)/g,
                    dependency: (v, $1) =>
                      `#framework/repositories/${firstLower($1)}`
                  },
                  {
                    whenImport: /#application\/services\/i(\w*)/g,
                    dependency: (v, $1) =>
                      `#framework/services/${firstLower($1)}`
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    optimization: {
      providedExports: true,
      usedExports: true,
      sideEffects: true,
      minimize: false
    },
    stats: {
      colors: true,
      hash: false,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      chunkOrigins: false,
      children: false,
      source: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      warningsFilter: /export .* was not found in/,
      publicPath: false,
      maxModules: 100,
      modules: false,
      moduleTrace: false,
      reasons: false,
      usedExports: true
    }
  };
})();
