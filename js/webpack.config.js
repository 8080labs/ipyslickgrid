var path = require('path');
var version = require('./package.json').version;
var webpack = require('webpack');

// Custom webpack loaders are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [
    { test: /\.css$/, use: ['style-loader', 'css-loader']},
    { test: /\.(jpe?g|png|gif|svg)$/i, use: ['file-loader']},
    {
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        },{
            loader: 'expose-loader',
            options: '$'
        }]
    }
];

var plugins = [
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       jquery: "jquery"
   })
];

module.exports = [
    {// Notebook extension
     //
     // This bundle only contains the part of the JavaScript that is run on
     // load of the notebook. This section generally only performs
     // some configuration for requirejs, and provides the legacy
     // "load_ipython_extension" function which is required for any notebook
     // extension.
     //
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'ipyslickgrid', 'static'),
            libraryTarget: 'amd'
        },
        plugins: plugins,
        mode: 'production'
    },
    {// Bundle for the notebook containing the custom widget views and models
     //
     // This bundle contains the implementation for the custom widget views and
     // custom widget.
     // It must be an amd module
     //
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'ipyslickgrid', 'static'),
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base', '@jupyter-widgets/controls'],
        plugins: plugins,
        mode: 'production'
    },
    {// Embeddable ipyslickgrid bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by unpkg to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './dist/'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/ipyslickgrid@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base', '@jupyter-widgets/controls'],
        plugins: plugins,
        mode: 'production'
    }
];
