import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node'
import globals from 'rollup-plugin-node-globals'

const plugins = [
  nodeResolve({
    browser: true,
    preferBuiltins: false
  }),

  commonjs({
    include: /node_modules/
  }),

  json(),

  nodePolyfills(),

  babel({
    babelHelpers: 'runtime',
    include: ['src/**'],
    extensions: ['.js'],
    presets: [
      [
        '@babel/preset-env',
        { modules: false }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
  }),

  globals(),
]

export default {
  plugins,
  input: './src/index.js',
  output: {
    format: 'umd',
    file: 'my-lib.js',
    exports: 'named',
    name: 'MyLib',
  },
}
