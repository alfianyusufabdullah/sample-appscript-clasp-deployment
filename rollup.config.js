import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import gas from 'rollup-plugin-gas';

export default {
  input: 'src/server/main.js',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        __SPREADSHEET_ID__: JSON.stringify(process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID'),
      },
    }),
    gas(),
    copy({
      targets: [{ src: 'appsscript.json', dest: 'dist' }],
    }),
  ],
};
