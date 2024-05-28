"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const webpack_node_externals_1 = __importDefault(require("webpack-node-externals"));
const config = {
    entry: './src/server.js',
    output: {
        path: path_1.default.resolve(__dirname, 'dist'),
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
        (0, webpack_node_externals_1.default)({
            allowlist: ['pg', 'pg-hstore'],
        }),
    ],
};
exports.default = config;
