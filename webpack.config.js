const Path = require("path");
const Webpack = require("webpack");

const WPack = {
    mode: "production",
    devtool: "source-map",
    performance: {
        hints: false,
    },
    entry: Path.resolve(__dirname, "demo/src/index.ts"),
    output: {
        filename: "[name].js",
        path: Path.resolve(__dirname, "demo/assets"),
    },
    cache: {
        type: "filesystem",
        cacheDirectory: Path.resolve(__dirname, ".cache"),
    },
};

// noinspection JSUnresolvedFunction
WPack.plugins = [
    new Webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
    }),
];

WPack.optimization = {
    minimize: true,
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all",
            },
        },
    },
};

WPack.module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            type: "asset",
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: {
                                autoprefixer: {},
                                cssnano: {preset: ["default", {discardComments: {removeAll: true}}]},
                            },
                        },
                    },
                },
                "sass-loader",
            ],
        },
        {
            test: /\.ts$/,
            use: [{
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.loader.json",
                },
            }],
        },
    ],
};

WPack.resolve = {
    extensions: [".ts", ".js"],
};

module.exports = WPack;
