module.exports = {
  require: ['@babel/register', 'esm', 'src/test/setup.js'],
  extension: ['js'],
  spec: 'src/**/*.test.js',
};
