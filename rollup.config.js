import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    resolve(),
    typescript({ 
      typescript: require('ttypescript'),
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { "transform": "typescript-transform-paths" },
            { "transform": "typescript-transform-paths", "afterDeclarations": true }
          ]
        }
      }
    }),
  ],
}