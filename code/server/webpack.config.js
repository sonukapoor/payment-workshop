module.exports = {
    entry: './server.ts',
    output: {
        path: __dirname,
        filename: './dist/server/bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.ts$/, 
                loader: 'ts-loader', 
                exclude: /node_modules/
            }
        ]
    }
}