const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

const join = (...paths) => path.join(__dirname, ...paths);

module.exports = (env, { mode }) => ({
    cache: false,
    resolve: {
        extensions: [".js", ".css"],
        modules: ["assets", "node_modules"],
    },
    entry: {
        main: [
            join("themes","hello-friend","assets", "js", "menu.js"),
            join("themes","hello-friend","assets", "js", "totop.js")
        ],
        style: join("themes","hello-friend","assets", "css", "style.css")
    },
    output: {
        filename: "[name].js",
        path: join("static/assets"),
        publicPath: "",
        pathinfo: false,
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|webp|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]",
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[local]",
                            },
                            import: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            minChunks: 2,
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: {
                        keep_classnames : true,
                        keep_fnames: true,
                        keep_fargs: true,
                    },
                    output: {
                      comments: false,
                    },
                  },
                extractComments: false
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '!static/assets/69d6ffe.js',
                '!static/assets/algolia.min.css',
                '!static/assets/APlayer.min.js',
                '!static/assets/APlayer.min.js.map',
                '!static/assets/APlayer.min.css',
                '!static/assets/APlayer.min.css.map',
                '!static/assets/disqus.js',
                '!static/assets/gist.min.css',
                '!static/assets/marked.min.js',
                '!static/assets/memos.js',
                '!static/assets/memos.min.js',
                '!static/assets/Meting.min.js',
                '!static/assets/moment.min.js',
                '!static/assets/moment.twitter.js',
                '!static/assets/moment.twitter.min.js',
                '!static/assets/pangu.min.js',
                '!static/assets/twikoo.min.js',
                '!static/assets/view-image.min.js',
                'static/assets/fonts',
                'static/assets/main.js',
                'static/assets/prism.js',
                'static/assets/style.css'
            ],
            cleanAfterEveryBuildPatterns: [
                join("static/assets/style.js"),
            ],
            verbose: true,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
});
