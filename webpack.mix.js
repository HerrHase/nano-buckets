const mix = require('laravel-mix')
const SvgSpritemapPlugin = require('svg-spritemap-webpack-plugin')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    plugins: [
        new SvgSpritemapPlugin('node_modules/@tentakelfabrik/plain-ui/src/icons/mono-icons/svg/*.svg', {
            output: {
                filename: 'public/symbol-defs.svg',
                chunk: {
                    keep: true
                },
                svgo: {
                    plugins: [{
                        removeAttrs: {
                            attrs: 'fill'
                        }
                    }]
                },
                svg4everybody: false
            },
            sprite: {
                prefix: 'icon-'
            }
        })
    ]
})

mix.options({
    terser: {
        extractComments: false
    }
})

mix
    .js('resources/js/index.js', 'public/js')
    .js('resources/js/critical.js', 'public/js')
    .sass('resources/scss/index.scss', 'public/css')