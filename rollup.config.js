import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import path from 'path'
import pkg from './package.json'
import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src']
  },
  postcss: {
    plugins: [
      autoprefixer,
      cssnano
    ]
  }
})

const onwarn = (warning, onwarn) => {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return
  return (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning)
}

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      svelte({
        dev,
        hydratable: true,
        preprocess,
        emitCss: true
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),

      !dev && terser({
        module: true
      })
    ],
    preserveEntrySignatures: 'strict',
    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      svelte({
        generate: 'ssr',
        preprocess,
        dev
      }),
      resolve({
        dedupe: ['svelte']
      }),
      commonjs()
    ],
    external: Object.keys(pkg.dependencies).concat(
      // eslint-disable-next-line node/no-deprecated-api
      require('module').builtinModules || Object.keys(process.binding('natives'))
    ),
    preserveEntrySignatures: 'strict',
    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    onwarn
  }
}
