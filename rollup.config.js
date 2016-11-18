export default {
  entry: 'src/main.js',
  dest: 'dist/js/ractive-materialize.js',
  format: 'umd',
  globals:{ ractive: 'Ractive'},
  external:['ractive'],
  sourceMap: 'inline',
};