import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

const config: Configuration = {
    entry: './src/server.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: [
        nodeExternals({
            allowlist: ['pg', 'pg-hstore'], // Usando allowlist para incluir módulos específicos
        }),
    ],
};

export default config;
