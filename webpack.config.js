const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const path = require("path");

const join = (...paths) => path.join(__dirname, ...paths);

module.exports = (env, {
    mode
}) => ({
    resolve: {
        extensions: [".css"],
        modules: ["assets", "node_modules"],
    },
    entry: {
        style: join("themes","hello-friend","assets", "css", "style.css")
    },
    output: {
        filename: "[name].js",
        path: join("static/assets/css"),
        publicPath: "",
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
                test: /\.(png|jpe?g|svg)$/,
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
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                'static/assets/css/style.min.css',
                'static/assets/css/fonts',
                '!static/assets/css/algolia.min.css',
                '!static/assets/css/gist.min.css'
            ],
            cleanAfterEveryBuildPatterns: [
                join("static/assets/css/style.js"),
            ],
            verbose: true,
        }),
        new MiniCssExtractPlugin({
            filename: "[name].min.css",
            chunkFilename: "[id].min.css",
        }),
    ],
});
