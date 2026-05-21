import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

function stripExports() {
  return {
    name: 'strip-exports',
    renderChunk(code) {
      return code.replace(/^export .+$/gm, '');
    },
  };
}

export default {
  input: 'src/server/main.js',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        __SPREADSHEET_ID__: JSON.stringify(process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID'),
      },
    }),
    stripExports(),
    copy({
      targets: [{ src: 'appsscript.json', dest: 'dist' }],
    }),
  ],
};
