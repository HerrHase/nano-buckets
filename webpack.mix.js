const mix = require('laravel-mix')

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

mix.options({
   terser: {
     extractComments: false
   }
})

mix
    .js('resources/js/index.js', 'public/js')
    .js('resources/js/critical.js', 'public/js')
    .sass('resources/scss/index.scss', 'public/css')
