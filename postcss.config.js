const url = require("postcss-url");
const imports = require("postcss-import");
const nested = require("postcss-nested");
const postCSSPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const mixins = require("postcss-mixins");
const mqpacker = require('css-mqpacker');
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = () => ({
    plugins: [
        url,
        imports,
        mixins,
        nested,
        postCSSPresetEnv({
            stage: 1,
        }),
        cssnano({
            preset: "default",
        }),
        mqpacker,
        purgecss({
            content: [
                "./themes/hello-friend/layouts/**/*.html",
            ],
            css: ['./themes/hello-friend/assets/css/style.css'],
            whitelist: ["html", "body"],
            whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
            rejected: true
        }),
    ],
});
