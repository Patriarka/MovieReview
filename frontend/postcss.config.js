const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.css',
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: [/^ant-/],
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
};