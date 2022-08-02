const path = require('path');

module.exports = {
    mode: 'production', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: './app/entry', // string | object | array
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, 'dist'), // string (default)
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: '[name].js', // string (default)
        // the filename template for entry chunks
        publicPath: '/assets/', // string
        // the url to the output directory resolved relative to the HTML page
        library: {
            // There is also an old syntax for this available (click to show)
            type: 'umd', // universal module definition
            // the type of the exported library
            name: 'MyLibrary' // string | string[]
            // the name of the exported library

            /* Advanced output.library configuration (click to show) */
        },
        uniqueName: 'my-application', // (defaults to package.json "name")
        // unique name for this build to avoid conflicts with other builds in the same HTML
        name: 'my-config'
        // name of the configuration, shown in output
        /* Advanced output configuration (click to show) */
        /* Expert output configuration 1 (on own risk) */
        /* Expert output configuration 2 (on own risk) */
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                // Conditions:
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, 'app')],
                exclude: [path.resolve(__dirname, 'app/demo-files')],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude to match the full path
                // - Try to avoid exclude and prefer include
                // Each condition can also receive an object with "and", "or" or "not" properties
                // which are an array of conditions.
                issuer: /\.css$/,
                issuer: path.resolve(__dirname, 'app'),
                issuer: { and: [/\.css$/, path.resolve(__dirname, 'app')] },
                issuer: { or: [/\.css$/, path.resolve(__dirname, 'app')] },
                issuer: { not: [/\.css$/] },
                issuer: [/\.css$/, path.resolve(__dirname, 'app')], // like "or"
                // conditions for the issuer (the origin of the import)
                /* Advanced conditions (click to show) */

                // Actions:
                loader: 'babel-loader',
                // the loader which should be applied, it'll be resolved relative to the context
                options: {
                    presets: ['es2015']
                },
                // options for the loader
                use: [
                    // apply multiple loaders and options instead
                    'htmllint-loader',
                    {
                        loader: 'html-loader',
                        options: {
                            // ...
                        }
                    }
                ],
                type: 'javascript/auto'
                // specifies the module type
                /* Advanced actions (click to show) */
            },
            {
                oneOf: [
                    // ... (rules)
                ]
                // only use one of these nested rules
            },
            {
                // ... (conditions)
                rules: [
                    // ... (rules)
                ]
                // use all of these nested rules (combine with conditions to be useful)
            }
        ]
        /* Advanced module configuration (click to show) */
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving of loaders)
        modules: ['node_modules', path.resolve(__dirname, 'app')],
        // directories where to look for modules (in order)
        extensions: ['.js', '.json', '.jsx', '.css'],
        // extensions that are used
        alias: {
            // a list of module name aliases
            // aliases are imported relative to the current context
            module: 'new-module',
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
            'only-module$': 'new-module',
            // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
            module: path.resolve(__dirname, 'app/third/module.js'),
            // alias "module" -> "./app/third/module.js" and "module/file" results in error
            module: path.resolve(__dirname, 'app/third'),
            // alias "module" -> "./app/third" and "module/file" -> "./app/third/file"
            [path.resolve(__dirname, 'app/module.js')]: path.resolve(
                __dirname,
                'app/alternative-module.js'
            ),
            // alias "./app/module.js" -> "./app/alternative-module.js"
            core: path.join(__dirname, 'core')
        }
        /* Alternative alias syntax (click to show) */
        /* Advanced resolve configuration (click to show) */
        /* Expert resolve configuration (click to show) */
    },
    performance: {
        hints: 'warning', // enum
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
        assetFilter: function (assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: 'source-map', // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: 'web', // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior, available external modules
    // and generated code style
    externals: ['react', /^@angular/],
    // Don't follow/bundle these modules, but request them at runtime from the environment
    externalsType: 'var', // (defaults to output.library.type)
    // Type of externals, when not specified inline in externals
    externalsPresets: {
        /* ... */
    },
    // presets of externals
    ignoreWarnings: [/warning/],
    stats: 'errors-only',
    stats: {
        // Examine all modules
        maxModules: Infinity,
        // Display bailout reasons
        optimizationBailout: true,
        // lets you precisely control what bundle information gets displayed
        preset: 'errors-only',
        // A stats preset

        /* Advanced global settings (click to show) */

        env: true,
        // include value of --env in the output
        outputPath: true,
        // include absolute output path in the output
        publicPath: true,
        // include public path in the output

        assets: true,
        // show list of assets in output
        /* Advanced assets settings (click to show) */

        entrypoints: true,
        // show entrypoints list
        chunkGroups: true,
        // show named chunk group list
        /* Advanced chunk group settings (click to show) */

        chunks: true,
        // show list of chunks in output
        /* Advanced chunk group settings (click to show) */

        modules: true,
        // show list of modules in output
        /* Advanced module settings (click to show) */
        /* Expert module settings (click to show) */

        /* Advanced optimization settings (click to show) */

        children: true,
        // show stats for child compilations

        logging: true,
        // show logging in output
        loggingDebug: /webpack/,
        // show debug type logging for some loggers
        loggingTrace: true,
        // show stack traces for warnings and errors in logging output

        warnings: true,
        // show warnings

        errors: true,
        // show errors
        errorDetails: true,
        // show details for errors
        errorStack: true,
        // show internal stack trace for errors
        moduleTrace: true,
        // show module trace for errors
        // (why was causing module referenced)

        builtAt: true,
        // show timestamp in summary
        errorsCount: true,
        // show errors count in summary
        warningsCount: true,
        // show warnings count in summary
        timings: true,
        // show build timing in summary
        version: true,
        // show webpack version in summary
        hash: true
        // show build hash in summary
    },
    devServer: {
        proxy: {
            // proxy URLs to backend development server
            '/api': 'http://snowcy.com'
        },
        static: path.join(__dirname, 'public'), // boolean | string | array | object, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false // true for self-signed, object for cert authority
        // ...
    },
    experiments: {
        asyncWebAssembly: true,
        // WebAssembly as async module (Proposal)
        syncWebAssembly: true,
        // WebAssembly as sync module (deprecated)
        outputModule: true,
        // Allow to output ESM
        topLevelAwait: true
        // Allow to use await on module evaluation (Proposal)
    },
    plugins: [
        // ...
    ],
    // list of additional plugins
    optimization: {
        chunkIds: 'size',
        // method of generating ids for chunks
        moduleIds: 'size',
        // method of generating ids for modules
        mangleExports: 'size',
        // rename export names to shorter names
        minimize: true,
        // minimize the output files
        minimizer: [new CssMinimizer(), '...'],
        // minimizers to use for the output files

        /* Advanced optimizations (click to show) */

        splitChunks: {
            cacheGroups: {
                'my-name': {
                    // define groups of modules with specific
                    // caching behavior
                    test: /\.sass$/,
                    type: 'css/mini-extract'

                    /* Advanced selectors (click to show) */

                    /* Advanced effects (click to show) */
                }
            },

            fallbackCacheGroup: {
                /* Advanced (click to show) */
            }

            /* Advanced selectors (click to show) */

            /* Advanced effects (click to show) */

            /* Expert settings (click to show) */
        }
    }
    /* Advanced configuration (click to show) */
    /* Advanced caching configuration (click to show) */
    /* Advanced build configuration (click to show) */
};
